export default function PublicationsPage() {
  return (
    <main className='h-full w-full px-4 py-6'>
      <div className='flex flex-col gap-4 px-4 text-center text-base text-foreground'>
        <h2 className='text-2xl font-bold'>Subscribe to my newsletter</h2>
        <p>Receive the latest updates about Taboo AI, and more about AI & creative learning 🚀</p>
      </div>
      <div className='h-4 w-full'></div>
      <div className='relative flex w-full flex-col gap-4'>
        <iframe
          src='https://liyuxuan.substack.com/embed'
          width='100%'
          height='550'
          style={{ fontFamily: 'lora' }}
          className='w-full rounded-lg border-[1px] bg-card text-card-foreground shadow-lg'
        ></iframe>
      </div>
      <div className='h-4 w-full'></div>
      <div className='flex flex-col gap-4 px-4 text-center text-base text-foreground'>
        <h2 className='text-2xl font-bold'>Check out my blogs</h2>
      </div>
      <div className='h-4 w-full'></div>
      <div className='relative flex w-full flex-col'>
        <iframe
          src='https://liyuxuan.dev/blogs'
          width='100%'
          height='750px'
          className='w-full rounded-lg border-[1px] shadow-lg'
        ></iframe>
      </div>
    </main>
  );
}
