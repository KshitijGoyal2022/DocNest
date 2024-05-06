import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: 'Please provide all fields',
        },
        { status: 400 }
      );
    }

    //check if user already exists
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          error: 'User already exists',
        },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPasword = await bcryptjs.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPasword,
      },
    });

    console.log(newUser);

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
