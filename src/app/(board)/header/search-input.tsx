"use client";

import { Input } from "@/components/input";
import { SearchIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent } from "react";

export function Searchinput() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  function handleSearchUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      // Limita as requests feitas na url para nao sobrecarregar a API (valor da url so muda apos 0.5s depois de digitar)
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    });
  }

  return (
    <div className="relative">
      <SearchIcon className="absolute size-4 text-navy-200 left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <Input
        type="text"
        placeholder="Search for features..."
        className="w-67.5 pl-8"
        value={search}
        onChange={handleSearchUpdate}
      />
    </div>
  );
}
