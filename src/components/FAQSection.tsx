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
      <h2 className="font-display text-2xl font-semibold text-charcoal">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-sage/30 rounded-2xl px-4 bg-card"
          >
            <AccordionTrigger className="text-sm font-medium text-charcoal hover:no-underline text-left">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-charcoal/70 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <button className="w-full text-sm font-accent font-medium text-charcoal/80 hover:text-charcoal transition-colors">
        More →
      </button>
    </section>
  );
};

export default FAQSection;
