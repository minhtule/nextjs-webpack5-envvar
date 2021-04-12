export default function Home() {
  return (
    <>
      <div>Hi</div>
      <p>{process.env.NEXT_PUBLIC_VAR_1}</p>
      <p>{process.env.NEXT_PUBLIC_VAR_2}</p>
      <p>{process.env.NEXT_PUBLIC_VAR_3}</p>
    </>
  );
}
