// components/supporting/JobListings.tsx
// Job Listings - Available positions

"use client";

import { useState } from "react";
import { Card } from "@/components/runes/cards/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Badge } from "@/components/runes/Badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/seidr/Dialog";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  description: string;
  responsibilities: string[];
  requirements: string[];
  created_at: string;
}

interface JobListingsProps {
  jobs: Job[];
}

const typeColors: Record<string, string> = {
  "full-time": "bg-green-500/20 text-green-400",
  "part-time": "bg-blue-500/20 text-blue-400",
  contract: "bg-orange-500/20 text-orange-400",
  remote: "bg-purple-500/20 text-purple-400",
};

export function JobListings({ jobs }: JobListingsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  if (jobs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">🔮</div>
        <h3 className="text-xl font-bold text-star-dust mb-2">No Open Positions</h3>
        <p className="text-star-dust/60">
          Check back soon for opportunities to join the Sanctuary
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-star-dust mb-4">Open Positions</h2>
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="p-5 hover:border-cyan-500/30 transition-all cursor-pointer"
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h3 className="text-lg font-bold text-star-dust">{job.title}</h3>
                  <Badge variant="outline" className={typeColors[job.type]}>
                    {job.type}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-star-dust/40">
                  <span>🏢 {job.department}</span>
                  <span>📍 {job.location}</span>
                  <span>📅 Posted {new Date(job.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-star-dust/60 text-sm mt-2 line-clamp-2">
                  {job.description}
                </p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Job Detail Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-star-dust">
                  {selectedJob.title}
                </DialogTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className={typeColors[selectedJob.type]}>
                    {selectedJob.type}
                  </Badge>
                  <span className="text-sm text-star-dust/40">🏢 {selectedJob.department}</span>
                  <span className="text-sm text-star-dust/40">📍 {selectedJob.location}</span>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-star-dust mb-2">About the Role</h4>
                  <p className="text-star-dust/60">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-star-dust mb-2">Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-star-dust/60">
                    {selectedJob.responsibilities?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-star-dust mb-2">Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-star-dust/60">
                    {selectedJob.requirements?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-neurospark mb-4">
                    ✨ Ready to answer the calling? Submit your application below.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedJob(null);
                      // Scroll to application form
                      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Apply for this position
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}