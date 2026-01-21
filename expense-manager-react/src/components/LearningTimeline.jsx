import { useState } from "react";
import { learningHistory } from "../data/learningHistory";

export default function LearningTimeline() {
  const [search, setSearch] = useState("");

  const filtered = learningHistory.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.tags.some(tag => tag.includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Learning Timeline</h2>

      <input
        type="text"
        placeholder="Search by topic (react, tailwind, chart...)"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full mb-5"
      />

      <ul className="space-y-4">
        {filtered.map(item => (
          <li
            key={item.id}
            className="flex gap-4 items-start border-l-2 border-blue-500 pl-4"
          >
            <span className="text-blue-600 font-bold">
              {item.id}.
            </span>

            <div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium"
              >
                {item.title}
              </a>

              <div className="mt-1 flex gap-2 flex-wrap">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm">
            No matching topics found
          </p>
        )}
      </ul>
    </div>
  );
}
