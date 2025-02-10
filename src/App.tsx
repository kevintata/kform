import { MultiValueSelect } from "./components/MultiValueSelect";

export const App = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen bg-amber-900">
      <h1 className="text-3xl underline font-bold text-zinc-400">
        MultiValueSelect
      </h1>

      <MultiValueSelect />
    </div>
  );
};
