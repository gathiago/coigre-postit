import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const { texto, cor, fonte, tamanho } = await req.json();

    await pool.query(
      `UPDATE postits SET texto=?, cor=?, fonte=?, tamanho=? WHERE id=?`,
      [texto, cor, fonte, tamanho, id]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/postits/[id] error:', err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await pool.query('DELETE FROM postits WHERE id=?', [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/postits/[id] error:', err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
