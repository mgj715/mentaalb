import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Who will be helping me?", a: "Our team includes licensed therapists, counselors, and trained peer supporters who are here to help you." },
  { q: "Is Mentaal right for me?", a: "Mentaal is designed for anyone seeking mental health support, whether for themselves or a loved one." },
  { q: "Is Mentaal free?", a: "Mentaal offers both free and premium services to ensure everyone can access the support they need." },
  { q: "How do I choose the right category for myself?", a: "Start by exploring the options that feel most relevant to your situation. There's no wrong choice." },
];

const FAQSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4 bg-card">
            <AccordionTrigger className="text-sm font-medium text-card-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <button className="w-full text-sm text-primary font-medium hover:underline transition-colors">
        More →
      </button>
    </section>
  );
};

export default FAQSection;
