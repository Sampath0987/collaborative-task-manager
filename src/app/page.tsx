import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col pt-16 pb-16">
      {/* ───── Hero ───── */}
      <section className="mt-20 pb-12 space-y-10 md:space-y-15 px-5">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Collaborative Task Management
          </Badge>

          <h1 className="gradient-title mx-auto max-w-6xl text-4xl font-bold md:text-8xl">
            Organize tasks, assign teammates, and track progress with ease
          </h1>

          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Create tasks, collaborate with your team, manage deadlines, and stay
            productive with our intuitive task management board.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              <Link href="/tasks">
                Go to Task Board
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl flex justify-center">
          <div className="gradient p-1 max-h-[60vh] overflow-hidden ">
            <Image
              src="/hero-image.png"
              width={1280}
              height={720}
              alt="Task Manager Banner"
              className="rounded-lg mx-auto h-auto max-h-[60vh] w-full object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
