import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const initialFaqs = [
  { q: "Who will be helping me?", a: "Our team includes licensed therapists, counselors, and trained peer supporters who are here to help you." },
  { q: "Is Mentaal right for me?", a: "Mentaal is designed for anyone seeking mental health support, whether for themselves or a loved one." },
  { q: "Is Mentaal free?", a: "Mentaal offers both free and premium services to ensure everyone can access the support they need." },
  { q: "How do I choose the right category for myself?", a: "Start by exploring the options that feel most relevant to your situation. There's no wrong choice." },
];

const extendedFaqs = [
  { q: "How do I get started with Mentaal?", a: "Simply create an account, take our short well-being quiz, and we'll guide you to the resources and support that fit your needs best." },
  { q: "Is my information kept confidential?", a: "Absolutely. Your privacy is our top priority. All conversations, quiz results, and personal data are encrypted and never shared with third parties without your explicit consent." },
  { q: "Can I use Mentaal for someone else?", a: "Yes! Mentaal offers resources for caregivers, friends, and family members who want to support a loved one's mental health journey." },
  { q: "What if I'm in a crisis right now?", a: "If you're in immediate danger, please call your local emergency services. Mentaal also provides quick access to crisis hotlines and urgent support resources on our Urgent Help page." },
  { q: "How often should I use Mentaal?", a: "There's no set schedule — use it as often as you need. Some people check in daily for exercises and journaling, while others visit weekly or when they need extra support." },
  { q: "Can I switch between categories later?", a: "Of course. Your needs may change over time, and Mentaal is designed to grow with you. You can retake the quiz or explore different categories anytime." },
  { q: "Are the exercises evidence-based?", a: "Yes. Our activities and tools are informed by cognitive-behavioural therapy (CBT), mindfulness practices, and positive psychology research." },
  { q: "Do I need to create an account?", a: "You can browse some resources without an account, but creating one lets you save progress, get personalised recommendations, and access the community forums." },
  { q: "Is Mentaal a replacement for therapy?", a: "Mentaal is a complementary resource, not a replacement for professional therapy. If you're experiencing severe symptoms, we encourage you to seek help from a licensed professional." },
  { q: "How can I give feedback or suggest features?", a: "We'd love to hear from you! Use the feedback form in your account settings or reach out to us through the community forums." },
];

const FAQSection = () => {
  const [showMore, setShowMore] = useState(false);

  const displayedFaqs = showMore ? [...initialFaqs, ...extendedFaqs] : initialFaqs;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-charcoal">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {displayedFaqs.map((faq, i) => (
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
      <button
        onClick={() => setShowMore(!showMore)}
        className="w-full text-sm font-accent font-medium text-charcoal/80 hover:text-charcoal transition-colors"
      >
        {showMore ? "Show less ←" : "More →"}
      </button>
    </section>
  );
};

export default FAQSection;
