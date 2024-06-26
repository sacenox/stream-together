import Logo from "./components/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-20">
      <Logo />

      <div className="flex flex-row gap-16 text-xl justify-evenly">
        <div className="font-sans sm:w-1/2 w-1/6">
          A new exciting app to start your next adventure online! It&apos;s
          easy, you can do it in 3 simple steps!
        </div>

        <ol className="list-decimal list-inside sm:w-1/2 w-1/6">
          <li>Create a new event</li>
          <li>Invite your guest by sharing the invite link</li>
          <li>Go live!</li>
        </ol>
      </div>

      <button className="text-rose-100 bg-rose-500 hover:bg-rose-900 active:border-b-rose-900 border-b-8 border-b-rose-950 font-bold text-2xl p-4 rounded-xl shadow-sm shadow-stone-800">
        Start your event now!
      </button>
    </main>
  );
}
