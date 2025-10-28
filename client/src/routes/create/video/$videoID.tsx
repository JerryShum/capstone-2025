import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/create/video/$videoID")({
  component: RouteComponent,
});

async function checkVideoStatus(operationName: string) {
  const response = await api.create.video.status[":name{.+}"].$get({
    param: { name: operationName },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const data = await response.json();
  return data;
}

function RouteComponent() {
  const { videoID } = Route.useParams();

  const videoOperationName = `models/veo-3.1-fast-generate-preview/operations/${videoID}`;

  const { data } = useQuery({
    queryKey: ["videoStatus", videoOperationName],
    queryFn: () => checkVideoStatus(videoOperationName),

    // FIX: The argument is the full `query` object, not just `data`.
    refetchInterval: (query) => {
      // Access your API data from `query.state.data`
      const status = query.state.data?.status;

      if (status === "SUCCESS" || status === "FAILED") {
        console.log(`Polling complete. Status: ${status}`);
        return false; // Stop polling
      }

      console.log(`Polling... Status: ${status || "PENDING"}`);
      return 10000; // Poll every 10 seconds (your comment says 3, but code is 10)
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (data?.status === "SUCCESS") {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "2rem auto",
          textAlign: "center",
        }}
      >
        <h2>Your video is ready! 🥳</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Your video has been generated and saved.
        </p>

        <video
          src={data.videoURL}
          controls
          autoPlay
          className="w-full rounded-lg"
        />
      </div>
    );
  }

  // This is your "loading / waiting" screen
  return (
    <div className="flex flex-col items-center justify-center px-40 py-10">
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Generating your video...</EmptyTitle>
          <EmptyDescription>
            Please wait while we generate your video! The video should be done
            generating in less than a minute.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent></EmptyContent>
      </Empty>
    </div>
  );
}
