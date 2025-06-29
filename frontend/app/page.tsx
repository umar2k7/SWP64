async function getData() {
  const res = await fetch("http://localhost:8000/", {
    next: { revalidate: 0 },
  });
  return res.json();
}

export default async function HomePage() {
  const data = await getData();

  return (
      <main>
        <h1>Data from server:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
  );
}