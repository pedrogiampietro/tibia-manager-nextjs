import { writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const acc = await prisma.accounts.findUnique({
      where: { id: Number(session.user.id) },
    });
    if (!acc) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.formData();
    const file = data.get('img') as File;
    const title = data.get('title') as string;
    const price = data.get('price') as string;
    const quantity = data.get('quantity') as string;
    const categoryId = Number(data.get('category'));
    const currency = data.get('currency') as string;

    if (!file || !title || !price || !quantity || !categoryId || !currency) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const category = await prisma.productsCategories.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return NextResponse.json({ message: 'Invalid category selected' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${randomUUID()}-${file.name}`;

    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(process.cwd(), 'public', 'shop');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(path.join(uploadDir, fileName), buffer);

    await prisma.products.create({
      data: {
        title,
        price,
        quantity: Number(quantity),
        content: title,
        img_url: fileName,
        currency,
        Categories: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
