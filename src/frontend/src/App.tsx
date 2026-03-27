import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Instagram,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Pill,
  Scale,
  Send,
  Shield,
  Trash2,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddShowcaseImage,
  useDeleteLead,
  useDeleteShowcaseImage,
  useGetAllLeads,
  useGetAllShowcaseImages,
  useSubmitInquiry,
} from "./hooks/useQueries";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  message: string;
}

const ADMIN_PASSWORD = "Alex@thomas2026";

const COUNTRIES = [
  "UK",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Sweden",
  "Norway",
  "Denmark",
  "Belgium",
  "Austria",
  "Switzerland",
  "Poland",
  "Portugal",
  "Other EU",
];

const PRODUCTS = [
  "Kamagra (Sildenafil)",
  "Vidalista (Tadalafil)",
  "Cenforce (Sildenafil)",
  "Cialis (Tadalafil)",
  "Generic ED Solutions",
  "Multiple Products",
  "Other",
];

const FEATURED_PRODUCTS = [
  {
    name: "Kamagra",
    ingredient: "Sildenafil Citrate",
    description:
      "A widely trusted sildenafil-based treatment for erectile dysfunction, available in tablet and oral jelly form across Europe.",
    tag: "Sildenafil",
  },
  {
    name: "Vidalista",
    ingredient: "Tadalafil",
    description:
      "Long-acting tadalafil solution offering up to 36 hours of effectiveness — a popular choice among European clients.",
    tag: "Tadalafil",
  },
  {
    name: "Cenforce",
    ingredient: "Sildenafil Citrate",
    description:
      "Reliable generic sildenafil alternative sourced to strict pharmaceutical standards, available across the UK and EU.",
    tag: "Sildenafil",
  },
  {
    name: "Cialis",
    ingredient: "Tadalafil",
    description:
      "The brand-name tadalafil treatment, renowned for its efficacy and long duration of action for ED management.",
    tag: "Tadalafil",
  },
];

const SEO_TOPICS = [
  {
    title: "Where to Buy ED Products",
    description:
      "Sourcing erectile dysfunction treatments across Europe and the UK requires a trusted pharmaceutical partner. Cure Pharmaceuticals connects clients to verified, high-quality ED solutions.",
  },
  {
    title: "Where to Buy Kamagra",
    description:
      "Kamagra (Sildenafil) is one of the most searched ED treatments in Europe. Submit your inquiry and our team will guide you to the right solution.",
  },
  {
    title: "Where to Buy Vidalista",
    description:
      "Vidalista (Tadalafil) provides long-lasting relief. Our European distribution network ensures discreet, compliant access to Vidalista products.",
  },
  {
    title: "Where to Buy Cenforce",
    description:
      "Cenforce is a reliable generic sildenafil option. We supply Cenforce to qualified clients across the UK, Germany, France, and the broader EU.",
  },
  {
    title: "Where to Buy Cialis",
    description:
      "Genuine Cialis (Tadalafil) sourcing for European markets. Contact Cure Pharmaceuticals for wholesale and retail inquiry support.",
  },
  {
    title: "Generic ED Solutions Europe",
    description:
      "Beyond brand names, we supply a full range of clinically effective generic ED treatments meeting EU and UK regulatory standards.",
  },
];

const CONTACT_CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us on WhatsApp",
    href: "https://wa.me/message/GAVCZG4DDEMMH1",
    color: "oklch(0.65 0.18 142)",
    bg: "oklch(0.65 0.18 142 / 0.1)",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@CurePharma2",
    href: "https://t.me/CurePharma2",
    color: "oklch(0.62 0.16 225)",
    bg: "oklch(0.62 0.16 225 / 0.1)",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "@curepharmaceuticals",
    href: "https://youtube.com/@curepharmaceuticals?si=ghOTqzdqO-xYf9MC",
    color: "oklch(0.55 0.22 25)",
    bg: "oklch(0.55 0.22 25 / 0.1)",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@cure_phramacy",
    href: "https://www.instagram.com/cure_phramacy?igsh=MWVnbTVubWR6YzMzag==",
    color: "oklch(0.58 0.2 340)",
    bg: "oklch(0.58 0.2 340 / 0.1)",
  },
  {
    icon: Mail,
    label: "Email",
    value: "curepharmaa@outlook.com",
    href: "mailto:curepharmaa@outlook.com",
    color: "oklch(0.62 0.088 195)",
    bg: "oklch(0.62 0.088 195 / 0.1)",
  },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: "oklch(0.62 0.088 195)" }}
      >
        <Pill className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-navy-deep"
          }`}
        >
          Cure
        </span>
        <span
          className={`text-xs font-light tracking-widest uppercase ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          Pharmaceuticals
        </span>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({
  formRef,
}: {
  formRef: React.RefObject<HTMLElement | null>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="main.link"
          >
            <a
              href="#products"
              className="text-sm font-medium text-foreground hover:text-teal transition-colors"
              data-ocid="nav.products.link"
            >
              Products
            </a>
            <a
              href="#solutions"
              className="text-sm font-medium text-foreground hover:text-teal transition-colors"
              data-ocid="nav.solutions.link"
            >
              Solutions
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground hover:text-teal transition-colors"
              data-ocid="nav.about.link"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground hover:text-teal transition-colors"
              data-ocid="nav.contact.link"
            >
              Contact
            </a>
            <button
              type="button"
              onClick={scrollToForm}
              className="text-sm font-medium text-foreground hover:text-teal transition-colors"
              data-ocid="nav.inquiry.link"
            >
              Inquiry
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-foreground"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {["Products", "Solutions", "About Us", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium py-1 text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────
function InquiryForm({
  formRef,
}: { formRef: React.RefObject<HTMLElement | null> }) {
  const submitMutation = useSubmitInquiry();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    productInterest: "",
    message: "",
  });

  const update = (field: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.email ||
      !form.country ||
      !form.productInterest
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        productInterest: form.productInterest,
        message: form.message,
        timestamp: BigInt(Date.now()),
      });
      toast.success("Inquiry submitted! Our team will contact you shortly.");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        productInterest: "",
        message: "",
      });
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <section ref={formRef as React.RefObject<HTMLElement>} id="inquiry">
      <div
        className="rounded-xl bg-white shadow-card p-6 md:p-8"
        data-ocid="inquiry.panel"
      >
        <h3 className="text-sm font-bold uppercase tracking-widest text-navy-deep mb-5">
          Request Product Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="fullName"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block"
            >
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="John Smith"
              value={form.fullName}
              onChange={(e) => update("fullName")(e.target.value)}
              className="h-10 border-border rounded-md text-sm"
              data-ocid="inquiry.input"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => update("email")(e.target.value)}
              className="h-10 border-border rounded-md text-sm"
              data-ocid="inquiry.email.input"
            />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block"
            >
              Phone (UK/EU)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+44 7700 000000"
              value={form.phone}
              onChange={(e) => update("phone")(e.target.value)}
              className="h-10 border-border rounded-md text-sm"
              data-ocid="inquiry.phone.input"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block">
              Country *
            </Label>
            <Select value={form.country} onValueChange={update("country")}>
              <SelectTrigger
                className="h-10 border-border rounded-md text-sm"
                data-ocid="inquiry.country.select"
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block">
              Medication Interested In *
            </Label>
            <Select
              value={form.productInterest}
              onValueChange={update("productInterest")}
            >
              <SelectTrigger
                className="h-10 border-border rounded-md text-sm"
                data-ocid="inquiry.product.select"
              >
                <SelectValue placeholder="Select medication" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCTS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block"
            >
              Message / Additional Info
            </Label>
            <Textarea
              id="message"
              placeholder="Describe your requirements, quantities, or any questions..."
              value={form.message}
              onChange={(e) => update("message")(e.target.value)}
              className="border-border rounded-md text-sm min-h-[80px]"
              data-ocid="inquiry.textarea"
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="bg-navy-deep hover:bg-navy-mid text-white rounded-lg px-6"
              data-ocid="inquiry.submit_button"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground mt-2">
              Your information is kept strictly confidential. We will not share
              your details with third parties.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection({
  formRef,
}: { formRef: React.RefObject<HTMLElement | null> }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.5;
    }
  }, []);

  return (
    <section
      className="relative min-h-[680px] flex items-center overflow-hidden"
      style={{ background: "oklch(0.14 0.054 258)" }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="/assets/uploads/234416-019d2e7f-8df0-76ae-9099-b1a48a257c0d-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.08 0.04 258 / 0.72)", zIndex: 1 }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
          zIndex: 2,
        }}
      />

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full"
        style={{ zIndex: 2 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.62 0.088 195 / 0.2)",
                color: "oklch(0.78 0.08 195)",
              }}
            >
              Europe &amp; UK Distribution
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white leading-tight tracking-tight mb-5">
              Trusted
              <span className="block" style={{ color: "oklch(0.72 0.1 195)" }}>
                Pharmaceutical
              </span>
              Solutions
              <span className="block text-white/80 text-2xl sm:text-3xl mt-1">
                Across Europe &amp; UK
              </span>
            </h1>
            <p className="text-white/75 text-base leading-relaxed mb-8 max-w-lg">
              Cure Pharmaceuticals connects verified clients across the United
              Kingdom and European Union with trusted, high-quality ED
              treatments — sourced, handled, and delivered with full regulatory
              compliance and complete discretion.
            </p>
            <Button
              onClick={scrollToForm}
              className="text-white font-semibold px-8 py-3 h-12 rounded-lg text-sm shadow-lg"
              style={{
                background: "oklch(0.62 0.088 195)",
              }}
              data-ocid="hero.primary_button"
            >
              Explore Products &amp; Inquire
            </Button>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <InquiryForm formRef={formRef} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SEO Section ──────────────────────────────────────────────────────────────
function SEOSection() {
  return (
    <section className="bg-white py-20 px-4" id="solutions">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-navy-deep mb-3">
            Finding Trusted ED Solutions in Europe &amp; UK
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            Thousands of clients across Europe search daily for legitimate,
            high-quality erectile dysfunction treatments. Cure Pharmaceuticals
            is the trusted answer.
          </p>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="seo.list"
        >
          {SEO_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-xl border border-border p-5 hover:shadow-card transition-shadow"
              data-ocid={`seo.item.${i + 1}`}
            >
              <div
                className="w-8 h-1 rounded-full mb-3"
                style={{ background: "oklch(0.62 0.088 195)" }}
              />
              <h3 className="font-bold text-navy-deep text-sm mb-2">
                {topic.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {topic.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Products ────────────────────────────────────────────────────────
function FeaturedProducts() {
  return (
    <section className="bg-band-light py-20 px-4" id="products">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-navy-deep">
            Featured Treatment Solutions
          </h2>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="products.list"
        >
          {FEATURED_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-card transition-shadow"
              data-ocid={`products.item.${i + 1}`}
            >
              <div
                className="h-1"
                style={{ background: "oklch(0.62 0.088 195)" }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-navy-deep text-base">
                    {product.name}
                  </h3>
                  <Badge
                    className="text-[10px] font-semibold"
                    style={{
                      background: "oklch(0.62 0.088 195 / 0.15)",
                      color: "oklch(0.5 0.088 195)",
                      border: "1px solid oklch(0.62 0.088 195 / 0.3)",
                    }}
                  >
                    {product.tag}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Active: {product.ingredient}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ProductTouchDown ─────────────────────────────────────────────────────
const FALLBACK_SHOWCASE_IMAGES = [
  {
    url: "https://placehold.co/300x200/1a1a2e/ffffff?text=Kamagra",
    caption: "Kamagra",
  },
  {
    url: "https://placehold.co/300x200/16213e/ffffff?text=Vidalista",
    caption: "Vidalista",
  },
  {
    url: "https://placehold.co/300x200/0f3460/ffffff?text=Cenforce",
    caption: "Cenforce",
  },
  {
    url: "https://placehold.co/300x200/533483/ffffff?text=Cialis",
    caption: "Cialis",
  },
  {
    url: "https://placehold.co/300x200/1a1a2e/ffffff?text=Generic+ED",
    caption: "Generic ED",
  },
];

function ProductTouchDown() {
  const { data: imageData } = useGetAllShowcaseImages();

  const images =
    imageData && imageData.length > 0
      ? imageData.map(([, img]) => ({ url: img.url, caption: img.caption }))
      : FALLBACK_SHOWCASE_IMAGES;

  const looped = [...images, ...images];

  return (
    <section className="py-16" style={{ background: "oklch(0.08 0.025 258)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.62 0.088 195)" }}
        >
          Featured Range
        </p>
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          Product TouchDown
        </h2>
        <p className="text-white/50 text-sm mt-2">
          Our Premium ED Product Range
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-6 w-max animate-marquee">
          {looped.map((img, i) => (
            <div
              key={`${img.url}-${i}`}
              className="flex flex-col items-center flex-shrink-0"
              style={{ width: 280 }}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="rounded-xl object-cover shadow-lg"
                style={{ width: 280, height: 180 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/300x200/1a1a2e/ffffff?text=Product";
                }}
              />
              {img.caption && (
                <span className="mt-2 text-xs text-white/60 text-center truncate max-w-full px-2">
                  {img.caption}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Commitment ───────────────────────────────────────────────────────────────
function CommitmentSection() {
  const items = [
    {
      icon: Shield,
      title: "Quality Assurance",
      text: "Every product we supply is sourced from verified manufacturers and tested against strict pharmaceutical quality benchmarks before distribution.",
    },
    {
      icon: FileText,
      title: "Regulatory Compliance",
      text: "We operate in full compliance with UK MHRA and EU EMA regulatory frameworks, ensuring all products meet legal standards for import and distribution.",
    },
    {
      icon: Scale,
      title: "Discreet Service",
      text: "Client confidentiality is paramount. All inquiries, communications, and deliveries are handled with the utmost discretion and privacy.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-navy-deep">
            Our Commitment
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.62 0.088 195 / 0.1)" }}
              >
                <item.icon
                  className="w-6 h-6"
                  style={{ color: "oklch(0.62 0.088 195)" }}
                />
              </div>
              <h3 className="font-bold text-navy-deep text-base mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-4"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.14 0.054 258) 0%, oklch(0.17 0.05 240) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.62 0.088 195 / 0.2)",
              color: "oklch(0.78 0.08 195)",
            }}
          >
            Reach Us Directly
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Get In Touch
          </h2>
          <p className="text-white/55 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Connect with our team through any of the channels below. We respond
            promptly to all inquiries from verified clients across Europe and
            the UK.
          </p>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="contact.list"
        >
          {CONTACT_CHANNELS.map((channel, i) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-3 rounded-xl p-6 border transition-all cursor-pointer"
              style={{
                background: "oklch(1 0 0 / 0.04)",
                borderColor: "oklch(1 0 0 / 0.1)",
              }}
              data-ocid={`contact.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: channel.bg }}
              >
                <channel.icon
                  className="w-6 h-6"
                  style={{ color: channel.color }}
                />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm">
                  {channel.label}
                </p>
                <p
                  className="text-xs mt-0.5 truncate max-w-[160px]"
                  style={{ color: channel.color }}
                >
                  {channel.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "oklch(0.14 0.054 258)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="text-white/55 text-xs leading-relaxed mt-4">
              Cure Pharmaceuticals is a trusted supplier of ED treatment
              solutions to verified clients across the United Kingdom and
              European Union.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-xs">
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.62 0.088 195)" }}
                />
                <a
                  href="mailto:curepharmaa@outlook.com"
                  className="hover:text-white transition-colors"
                >
                  curepharmaa@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-xs">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.62 0.088 195)" }}
                />
                +44 20 0000 0000
              </li>
              <li className="flex items-center gap-2 text-white/60 text-xs">
                <MapPin
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.62 0.088 195)" }}
                />
                United Kingdom &amp; EU Distribution
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Products", "Solutions", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-white/60 hover:text-white text-xs transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Regulatory Info",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-white/60 hover:text-white text-xs transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "oklch(1 0 0 / 0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-white/40 text-xs text-center">
            &copy; {year} Cure Pharmaceuticals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Admin Password Gate ──────────────────────────────────────────────────────
function AdminPasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.12 0.054 258) 0%, oklch(0.16 0.05 240) 100%)",
      }}
      data-ocid="admin.panel"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Logo light />
          <p
            className="text-xs font-semibold uppercase tracking-widest mt-4"
            style={{ color: "oklch(0.78 0.08 195)" }}
          >
            Admin Access
          </p>
        </div>

        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "oklch(1 0 0 / 0.04)",
            borderColor: "oklch(1 0 0 / 0.12)",
          }}
        >
          <h2 className="text-white font-bold text-lg mb-2">
            Admin Panel Login
          </h2>
          <p className="text-white/50 text-xs mb-6">
            Enter the admin password to access the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="adminPassword"
                className="text-xs font-semibold uppercase tracking-wide mb-1 block"
                style={{ color: "oklch(0.78 0.08 195)" }}
              >
                Password
              </Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="h-11 rounded-lg text-sm border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-teal"
                data-ocid="admin.input"
                autoFocus
              />
            </div>

            {error && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.65 0.22 25)" }}
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-11 font-semibold text-white rounded-lg"
              style={{ background: "oklch(0.62 0.088 195)" }}
              data-ocid="admin.submit_button"
            >
              Access Admin Panel
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: leads, isLoading } = useGetAllLeads();
  const deleteMutation = useDeleteLead();
  const [search, setSearch] = useState("");
  const { data: showcaseImages, isLoading: imagesLoading } =
    useGetAllShowcaseImages();
  const addImageMutation = useAddShowcaseImage();
  const deleteImageMutation = useDeleteShowcaseImage();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageLabel, setNewImageLabel] = useState("");

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      toast.error("Please enter an image URL.");
      return;
    }
    try {
      await addImageMutation.mutateAsync({
        url: newImageUrl.trim(),
        caption: newImageLabel.trim(),
      });
      toast.success("Image added to TouchDown section!");
      setNewImageUrl("");
      setNewImageLabel("");
    } catch {
      toast.error("Failed to add image.");
    }
  };

  const handleDeleteImage = async (id: bigint) => {
    try {
      await deleteImageMutation.mutateAsync(id);
      toast.success("Image removed.");
    } catch {
      toast.error("Failed to delete image.");
    }
  };

  const filtered = (leads ?? []).filter(([, lead]) => {
    const q = search.toLowerCase();
    return (
      lead.fullName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.country.toLowerCase().includes(q) ||
      lead.productInterest.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Lead deleted.");
    } catch {
      toast.error("Failed to delete lead.");
    }
  };

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp / 1_000_000n);
    return new Date(ms).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.005 258)" }}
    >
      {/* Dashboard header */}
      <header
        className="sticky top-0 z-50 shadow-xs border-b border-border"
        style={{ background: "oklch(0.14 0.054 258)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo light />
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-xs hidden sm:block">
              Admin Dashboard
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-white/20 text-white hover:bg-white/10 hover:text-white text-xs"
              data-ocid="admin.logout.button"
            >
              <LogOut className="w-3 h-3 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="inquiries">
          <TabsList className="mb-8" data-ocid="admin.tab">
            <TabsTrigger value="inquiries" data-ocid="admin.inquiries.tab">
              Client Inquiries
            </TabsTrigger>
            <TabsTrigger value="touchdown" data-ocid="admin.touchdown.tab">
              TouchDown Images
            </TabsTrigger>
          </TabsList>

          {/* ── Client Inquiries Tab ── */}
          <TabsContent value="inquiries">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold uppercase tracking-tight text-navy-deep">
                  Submitted Inquiries
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {leads?.length ?? 0} total lead
                  {(leads?.length ?? 0) !== 1 ? "s" : ""}
                </p>
              </div>
              <Input
                placeholder="Search by name, email, country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs h-9 text-sm"
                data-ocid="admin.search_input"
              />
            </div>

            {isLoading ? (
              <div className="space-y-3" data-ocid="admin.loading_state">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-20 rounded-xl border border-dashed border-border bg-white"
                data-ocid="admin.empty_state"
              >
                <p className="text-muted-foreground text-sm">
                  {search
                    ? "No leads match your search."
                    : "No inquiries submitted yet."}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-border overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Lead ID
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Full Name
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Email
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Phone
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Country
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Product
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Message
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wide text-navy-deep">
                          Date Submitted
                        </TableHead>
                        <TableHead className="w-12" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map(([id, lead], idx) => (
                        <TableRow
                          key={id.toString()}
                          className="hover:bg-band-light/50"
                          data-ocid={`admin.row.${idx + 1}`}
                        >
                          <TableCell className="text-xs text-muted-foreground font-mono">
                            #{id.toString()}
                          </TableCell>
                          <TableCell className="text-xs font-medium text-foreground">
                            {lead.fullName}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {lead.email}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {lead.phone || "—"}
                          </TableCell>
                          <TableCell className="text-xs">
                            <Badge variant="secondary" className="text-[10px]">
                              {lead.country}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">
                            {lead.productInterest}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-[180px] truncate">
                            {lead.message || "—"}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(lead.timestamp)}
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => handleDelete(id)}
                              disabled={deleteMutation.isPending}
                              className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                              data-ocid={`admin.delete_button.${idx + 1}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          {/* ── TouchDown Images Tab ── */}
          <TabsContent value="touchdown">
            <div className="mb-8">
              <h1 className="text-xl font-extrabold uppercase tracking-tight text-navy-deep mb-1">
                TouchDown Images
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage product showcase images displayed in the scrolling
                marquee.
              </p>
            </div>

            {/* Add image form */}
            <div
              className="bg-white rounded-xl border border-border p-6 mb-8 shadow-xs"
              data-ocid="admin.touchdown.panel"
            >
              <h2 className="text-sm font-bold uppercase tracking-wide text-navy-deep mb-4">
                Add New Image
              </h2>
              <form
                onSubmit={handleAddImage}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  placeholder="https://example.com/product.jpg"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 h-9 text-sm"
                  data-ocid="admin.touchdown.input"
                />
                <Input
                  placeholder="Product Name"
                  value={newImageLabel}
                  onChange={(e) => setNewImageLabel(e.target.value)}
                  className="w-full sm:w-48 h-9 text-sm"
                  data-ocid="admin.touchdown.label.input"
                />
                <Button
                  type="submit"
                  disabled={addImageMutation.isPending}
                  className="h-9 text-sm"
                  data-ocid="admin.touchdown.submit_button"
                >
                  {addImageMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  ) : null}
                  Add Image
                </Button>
              </form>
            </div>

            {/* Image grid */}
            {imagesLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                data-ocid="admin.touchdown.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-52 w-full rounded-xl" />
                ))}
              </div>
            ) : !showcaseImages || showcaseImages.length === 0 ? (
              <div
                className="text-center py-20 rounded-xl border border-dashed border-border bg-white"
                data-ocid="admin.touchdown.empty_state"
              >
                <p className="text-muted-foreground text-sm">
                  No images added yet. Add your first product image above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {showcaseImages.map(([id, img], idx) => (
                  <div
                    key={id.toString()}
                    className="bg-white rounded-xl border border-border overflow-hidden shadow-xs"
                    data-ocid={`admin.touchdown.item.${idx + 1}`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x200/e2e8f0/94a3b8?text=Image+Error";
                      }}
                    />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {img.caption || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {img.url}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(id)}
                        disabled={deleteImageMutation.isPending}
                        className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        data-ocid={`admin.touchdown.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const isAdminRoute = window.location.href.includes("Alexx");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const formRef = useRef<HTMLElement | null>(null);

  // Admin route: show password gate or dashboard
  if (isAdminRoute) {
    if (adminAuthed) {
      return (
        <>
          <AdminDashboard onLogout={() => setAdminAuthed(false)} />
          <Toaster richColors />
        </>
      );
    }
    return (
      <>
        <AdminPasswordGate onSuccess={() => setAdminAuthed(true)} />
        <Toaster richColors />
      </>
    );
  }

  // Normal visitor view — no admin links visible
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster richColors />
      <Header formRef={formRef} />

      <main className="flex-1">
        <HeroSection formRef={formRef} />
        <SEOSection />
        <FeaturedProducts />
        <ProductTouchDown />
        <CommitmentSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
