import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v4 as uuid } from 'uuid';

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get('session_id');
  if (!session_id) {
    return NextResponse.json({ error: 'session_id obrigatório' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM postits
       WHERE session_id = ?
       ORDER BY grupo_id DESC, posicao ASC
       LIMIT 100`,
      [session_id]
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET /api/postits error:', err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { session_id, notes } = await req.json();

    if (!session_id || !Array.isArray(notes) || notes.length === 0 || notes.length > 5) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const grupo_id = uuid();

    const values = notes.map((n: any, i: number) => [
      session_id,
      n.cor || 'amarelo',
      n.fonte || 'caveat',
      n.tamanho || 18,
      n.texto || '',
      i,
      grupo_id,
    ]);

    await pool.query(
      `INSERT INTO postits (session_id, cor, fonte, tamanho, texto, posicao, grupo_id)
       VALUES ?`,
      [values]
    );

    return NextResponse.json({ ok: true, grupo_id }, { status: 201 });
  } catch (err) {
    console.error('POST /api/postits error:', err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
