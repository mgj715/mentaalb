import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PATIENT_STAGES, patientStageContent } from "@/lib/exploring-data";

const VISITED_KEY = "mentaal.patient.visited.v1";

const loadVisited = (): string[] => {
  try {
    const raw = localStorage.getItem(VISITED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const PatientJourney = () => {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(loadVisited());
  }, []);

  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-display text-lg font-semibold text-charcoal">Your path</h2>
        <p className="text-xs text-charcoal/60 mt-0.5">A gentle sequence, at your own pace.</p>
      </div>
      <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2 scrollbar-hide">
        {PATIENT_STAGES.map((stage, idx) => {
          const count = patientStageContent(stage.id).length;
          const seen = visited.includes(stage.id);
          return (
            <Link
              key={stage.id}
              to={`/patient/${stage.id}`}
              className={`group relative w-60 shrink-0 rounded-2xl border px-4 py-4 transition-colors ${
                seen
                  ? "border-sage/50 bg-sage/25 shadow-sm"
                  : "border-peach/50 bg-peach/25 shadow-sm hover:bg-peach/25"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-accent text-[10px] uppercase tracking-wider text-charcoal/55">
                  Stage {idx + 1}
                </span>
                {seen && (
                  <span className="font-accent text-[10px] text-charcoal/55">visited</span>
                )}
              </div>
              <p className="font-display text-base font-semibold text-charcoal leading-snug mt-1.5">
                {stage.title}
              </p>
              <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed line-clamp-2">
                {stage.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-accent text-[11px] text-charcoal/60">
                  {count} {count === 1 ? "piece" : "pieces"}
                </span>
                <ArrowRight
                  size={14}
                  className="text-charcoal/60 transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export const markPatientStageVisited = (id: string) => {
  try {
    const cur = loadVisited();
    if (cur.includes(id)) return;
    localStorage.setItem(VISITED_KEY, JSON.stringify([...cur, id]));
  } catch {
    // ignore
  }
};

export default PatientJourney;
