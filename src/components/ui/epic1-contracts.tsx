import { Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Epic1ComponentContracts() {
  return (
    <div hidden>
      <Button variant="primary" size="sm" type="button" disabled>
        Disabled primary
      </Button>
      <Button variant="secondary" size="md" href="/services">
        Secondary link
      </Button>
      <Button variant="tertiary" size="lg" href="/managed-intelligence-provider">
        Learn more
      </Button>
      <Button
        variant="icon"
        aria-label="Open settings"
        icon={<Settings aria-hidden="true" className="h-4 w-4" />}
      />
    </div>
  );
}
