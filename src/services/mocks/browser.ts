import { setupWorker } from "msw/browser";
import { handlers } from "@/services/handlers/betsocial.handlers";

export const worker = setupWorker(...handlers);
