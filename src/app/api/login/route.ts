import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const parsedBody = LoginSchema.safeParse(reqBody);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.flatten() },
        { status: 400 }
      );
    }
    console.log(parsedBody.data);
    const { email, password } = parsedBody.data;

    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: 'Try logging in with an auth provider' },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password); //if null return, no user account found

    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const tokenData = {
      id: user.id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });

    response.cookies.set('next-auth.session-token', token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
