import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/lib/index';
import { amplitudeEvents } from '@/lib/amplitude';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      amplitudeEvents.openConsultationModal('unknown_or_direct');
    }
  }, [isOpen]);

  const handleClose = () => {
    amplitudeEvents.closeConsultationModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative flex flex-col md:flex-row bg-card rounded-2xl md:rounded-3xl shadow-2xl border border-border/50 w-full max-w-4xl max-h-full overflow-y-auto pointer-events-auto"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 md:right-4 md:top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 hover:bg-background border border-border/50 text-foreground transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left side: Business Cards */}
              <div className="w-full md:w-5/12 bg-muted/30 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/50 shrink-0">
                <div className="text-center mb-4 hidden md:block">
                  <p className="text-sm text-muted-foreground">Product Engineer</p>
                </div>
                {/* Cards Container */}
                <div className="flex flex-row md:flex-col justify-center gap-3 w-full max-w-[320px] md:max-w-[220px]">
                  <div className="flex-1 md:flex-none aspect-[1/1.6] rounded-xl overflow-hidden shadow-md border border-border/20 bg-background relative">
                    <img src="/images/front.png" alt="Business Card Front" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 md:flex-none aspect-[1/1.6] rounded-xl overflow-hidden shadow-md border border-border/20 bg-background relative">
                    <img src="/images/back.png" alt="Business Card Back" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Right side: Form */}
              <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-center bg-card shrink-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">무료 MVP 상담</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    아이디어가 있다면, 먼저 개발 견적을 받기 전에 검증 방향부터 정리해 보세요. 확인 후 빠르게 회신드리겠습니다.
                  </p>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;

                    const formData = new FormData(e.currentTarget);
                    const desc = formData.get('description') as string;
                    const contact = formData.get('contact') as string;

                    setIsSubmitting(true);

                    try {
                      const response = await fetch("https://qdvwwnylfhhevwzdfumm.supabase.co/functions/v1/consultation", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          contact: contact,
                          content: desc
                        }),
                      });

                      if (response.ok) {
                        amplitudeEvents.submitConsultation('success');
                        alert("상담 신청이 완료되었습니다. 확인 후 빠르게 연락드리겠습니다!");
                        onClose();
                      } else {
                        amplitudeEvents.submitConsultation('failure', `HTTP status: ${response.status}`);
                        alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                      }
                    } catch (error) {
                      const errMsg = error instanceof Error ? error.message : 'Unknown error';
                      amplitudeEvents.submitConsultation('failure', errMsg);
                      console.error("Consultation form error:", error);
                      alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <div className="space-y-1.5">
                    <label htmlFor="contact" className="text-sm font-semibold text-foreground/90">
                      연락처 또는 이메일 <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      required
                      type="text"
                      placeholder="답변 받으실 연락처"
                      className="w-full px-4 py-3 mt-2 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-base md:text-sm"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="description" className="text-sm font-semibold text-foreground/90">
                      현재 고민이나 아이디어 <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      placeholder="어떤 서비스인가요? 무엇이 고민이신가요?"
                      className="w-full h-20 px-4 py-3 mt-2 rounded-xl border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-base md:text-sm resize-none"
                    />
                  </div>
                  <Button disabled={isSubmitting} type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">
                    {isSubmitting ? '신청 중...' : '상담 신청하기'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
