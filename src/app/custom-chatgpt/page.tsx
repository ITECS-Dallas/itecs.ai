import { permanentRedirect } from "next/navigation";

export default function CustomChatGPTRedirectPage() {
  permanentRedirect("/custom-ai-agents");
}
