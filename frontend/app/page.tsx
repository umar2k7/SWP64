'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface Question {
  id: number;
  text: string;
  maxScore: number;
}

export default function Page() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', maxScore: 0 },
    ]);
  };

  const updateQuestion = (id: number, field: 'text' | 'maxScore', value: string) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, [field]: field === 'maxScore' ? parseInt(value) || 0 : value } : q
    ));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          date,
          questions: questions.map(q => ({
            text: q.text,
            max_score: q.maxScore,
          })),
        }),
      });

      if (!response.ok) throw new Error('Ошибка при отправке');

      const data = await response.json();
      const downloadUrl = `http://localhost:8000${data.file_url}`;

      const pdfRes = await fetch(downloadUrl);
      const blob = await pdfRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      setResult('Форма отправлена, PDF загружен');
    } catch (error) {
      console.error(error);
      setResult('Ошибка при отправке или скачивании');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Создание теста</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Название</Label>
          <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="date">Дата</Label>
          <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Вопросы</h2>

        {questions.map((q, index) => (
          <Card key={q.id}>
            <CardContent className="space-y-2 p-4">
              <div>
                <Label>Вопрос #{index + 1}</Label>
                <Input
                  placeholder="Текст вопроса"
                  value={q.text}
                  onChange={e => updateQuestion(q.id, 'text', e.target.value)}
                />
              </div>
              <div>
                <Label>Макс. балл</Label>
                <Input
                  type="number"
                  min={0}
                  value={q.maxScore}
                  onChange={e => updateQuestion(q.id, 'maxScore', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" onClick={addQuestion}>
          + Добавить вопрос
        </Button>
      </div>

      <div className="pt-4 space-y-2">
        <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </Button>

        {result && <p className="text-sm text-gray-600">{result}</p>}
      </div>
    </main>
  );
}
