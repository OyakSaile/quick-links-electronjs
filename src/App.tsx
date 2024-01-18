import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Edit, Link, PlusCircle, Trash } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { useState } from "react";

interface HistoryI {
  id: number;
  title: string;
  description: string;
  link: string;
}
function App() {
  const [history, setHistory] = useState<HistoryI[]>([]);

  const [annotation, setAnnotation] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleCreateAnnotation = () => {
    setHistory([
      ...history,
      {
        id: history.length + 1,
        title: annotation.title,
        description: annotation.description,
        link: annotation.link,
      },
    ]);
    setAnnotation({
      title: "",
      description: "",
      link: "",
    });
  };

  console.log(history);

  return (
    <div className="min-h-screen dark relative p-4 space-y-4 bg-slate-900">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/oyaksaile.png" />
          <AvatarFallback>KAYO ELIAS</AvatarFallback>
        </Avatar>
        <h1 className="text-white  text-xs font-bold">Kayo Elias</h1>
      </div>

      {history.map((item) => (
        <Accordion key={item.id} type="single" collapsible>
          <AccordionItem className="text-xs" value="item-1">
            <AccordionTrigger className="text-xs">
              {item.title}
            </AccordionTrigger>{" "}
            <AccordionContent className="text-xs ">
              <div className="flex gap-1">
                Helper:
                <span className="text-blue-300 flex text-xs gap-1 items-center">
                  {item.link} <Link size={13} />
                </span>
              </div>
            </AccordionContent>
            <AccordionContent className="text-xs">
              {item.description}
              <div className="flex items-center gap-2 mt-2 ">
                <Check size={16} />
                <Edit size={16} />
                <Trash className="text-red-400" size={16} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      {history.map.length === 0 && (
        <div className="text-white text-xs font-bold">No History</div>
      )}

      <div className="flex items-center gap-2 px-8 absolute bottom-8 right-0">
        <Dialog>
          <DialogTrigger>
            <PlusCircle />
          </DialogTrigger>
          <DialogContent className="dark w-[90%]">
            <DialogHeader>
              <DialogTitle>Create new annotation</DialogTitle>
              <DialogDescription>
                Create your annotation here.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-2 flex-col">
              <Input
                label="Title"
                onChange={(e) =>
                  setAnnotation({ ...annotation, title: e.target.value })
                }
                placeholder="Type your title here..."
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Input
                label="Helper Link"
                placeholder="https://www.example.com.br"
                onChange={(e) =>
                  setAnnotation({ ...annotation, link: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Textarea
                className="resize-none"
                placeholder="Type your description here..."
                onChange={(e) =>
                  setAnnotation({ ...annotation, description: e.target.value })
                }
              />
            </div>

            <DialogFooter>
              <div className="grid grid-cols-2 gap-4">
                <DialogTrigger className="w-full">
                  <Button className="w-full" variant={"outline"}>
                    Cancel
                  </Button>
                </DialogTrigger>

                <DialogTrigger className="w-full">
                  <Button className="w-full" onClick={handleCreateAnnotation}>
                    Create
                  </Button>
                </DialogTrigger>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
