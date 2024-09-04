import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import GitHubButton from "react-github-btn";
import { Item, list } from "../../src/list.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const baseUrl = "http://localhost:3000";

const Home: React.FC = () => {
  const [method, setMethod] = useState('');
  const [format, setFormat] = useState('any');

  const groups: [string, Item[]][] = useMemo(() => {
    const groups: Record<string, Item[]> = {};
    for (const item of list) {
      if (!groups[item.group]) {
        groups[item.group] = [];
      }
      groups[item.group].push(item);
    }

    return Object.entries(groups);
  }, []);

  return (
    <div>
      <header className="flex justify-between py-4 px-8 bg-slate-200">
        <div>
          <div className="text-lg font-bold">Sample Website</div>
          <p className="text-xs">
            This website contains different pages to test your crawler or your
            tools
          </p>
        </div>
        <div>
          <GitHubButton
            href="https://github.com/bodinsamuel/sample-website"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-star"
            data-size="large"
            aria-label="Star bodinsamuel/sample-website on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </header>
      <main className="w-full px-8 py-4">
        <div className="rounded-md border px-4 py-2 text-sm absolute right-0 w-[250px] flex flex-col gap-2">
          <h3 className="font-bold text-sm capitalize">
            Filters
          </h3>
          <div className="flex">
            <label className="text-xs w-1/2">Output format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="border rounded w-1/3 cursor-pointer">
              <option value="*">any</option>
              <option value="json">json</option>
              <option value="xml">xml</option>
              <option value="html">html</option>
            </select>
          </div>
          <div className="flex">
            <label className="text-xs w-1/2">Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="border rounded w-1/3 cursor-pointer">
              <option value="">any</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {groups.map(([group, items]) => {
            return (
              <div key={group}>
                {group !== "1" && (
                  <h2 className="font-bold text-md capitalize mt-1">{group}</h2>
                )}

                <div className="grid grid-cols-3 w-full gap-8 mt-4">
                  {items.map((item) => {
                    return (
                      <div className="w-full rounded-md border px-4">
                        <h3 className="font-bold text-sm capitalize mt-2">
                          {item.name}
                        </h3>

                        <div className="my-3">
                          <ul className="flex flex-col gap-2">
                            {item.links.map((link) => {
                              return (
                                <li key={link.path}>
                                  <a
                                    href={`${baseUrl}${link.path}`}
                                    className="inline-flex gap-2 text-sm border rounded-md px-2 py-0.5 hover:bg-slate-100"
                                  >
                                    <div className="text-green-600">{method || 'GET'}</div>
                                    <div className=" text-blue-400">
                                      {link.path}
                                    </div>
                                  </a>
                                  <div className="text-xs pl-0.5 text-gray-800">
                                    {link.desc}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer>
        <div></div>
      </footer>
    </div>
  );
};

root.render(<Home />);
