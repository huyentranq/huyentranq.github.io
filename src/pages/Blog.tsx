import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Presentation } from 'lucide-react';

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const BeyondData: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f12] text-white">
      <motion.header
        className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8 lg:px-12 lg:pb-14"
        initial="hidden"
        animate="visible"
        variants={reveal}
      >
        <p className="text-[10px] text-[#83727b]">
          <span className="text-[#ff4fa3]">huyen@portfolio</span> : ~/beyond-data $ open field-notes.md
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_260px] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase text-[#c76b98]">Field notes / outside the terminal</p>
            <h1 className="portfolio-title mt-4 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Beyond Data
            </h1>
          </div>
          <p className="text-[12px] leading-6 text-[#9b8e95]">
            A small record of the places, people, and experiences that continue shaping how I learn, work, and see the world.
          </p>
        </div>
        <p className="mt-10 text-[10px] text-[#ff67b0]">read_field_notes ↓</p>
      </motion.header>

      <main>
        <motion.article
          id="field-note-01"
          className="border-t border-[#3b2632]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={reveal}
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
              <div>
                <Mountain className="h-5 w-5 text-[#ff4fa3]" />
                <p className="mt-4 text-[10px] font-bold uppercase text-[#c76b98]">Field note 01</p>
                <p className="mt-1 text-[10px] text-[#65515b]">Hiking / Perspective</p>
              </div>
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">One step at a time</h2>
                <div className="mt-5 space-y-4 text-[13px] leading-7 text-[#aaa0a5]">
                  <p>
                    Hiking gives me a different relationship with progress. On a long trail, there is no shortcut that replaces the next deliberate step. The path can be uneven, the destination can disappear behind the trees, and the only useful response is to stay attentive and keep moving.
                  </p>
                  <p>
                    Reaching an open view is rewarding, but the quieter lesson happens along the way: patience compounds. That perspective follows me back into technical work, where difficult systems and unfamiliar problems also become manageable when they are approached carefully, one decision at a time.
                  </p>
                </div>
              </div>
            </div>

            <figure className="mt-10">
              <img
                src="/images/beyond data/leo nui 1.jpg"
                alt="Huyen Trang standing beside the Vietnamese flag at a mountain viewpoint"
                className="aspect-[16/9] w-full border border-[#432b37] object-cover"
              />
              <figcaption className="mt-3 text-[10px] text-[#6f5a64]">A clear view after a long trail.</figcaption>
            </figure>

            <figure className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px] lg:items-end">
              <img
                src="/images/beyond data/leo nui 2.jpg"
                alt="A hiking group walking through a green forest trail"
                className="max-h-[760px] w-full border border-[#432b37] object-cover object-center"
              />
              <figcaption className="pb-2 text-[11px] leading-6 text-[#7f6b75]">
                Some parts of the journey are shared: moving at different speeds, watching the path for one another, and arriving with more than a photograph.
              </figcaption>
            </figure>
          </div>
        </motion.article>

        <motion.article
          id="field-note-02"
          className="border-t border-[#3b2632] bg-[#0d0a0d]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={reveal}
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
              <div>
                <Presentation className="h-5 w-5 text-[#ff4fa3]" />
                <p className="mt-4 text-[10px] font-bold uppercase text-[#c76b98]">Field note 02</p>
                <p className="mt-1 text-[10px] text-[#65515b]">People / Growth</p>
              </div>
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">Learning in public</h2>
                <div className="mt-5 space-y-4 text-[13px] leading-7 text-[#aaa0a5]">
                  <p>
                    Some of my most valuable learning has happened in front of other people: presenting an idea, answering an unexpected question, and discovering which parts of my thinking are clear only to me. Sharing technical work turns private understanding into something a team can examine, challenge, and improve.
                  </p>
                  <p>
                    Experiences at Intel have shown me that professional growth is not only about becoming more technically capable. It is also about communicating with care, listening to different perspectives, and contributing to an environment where people can build stronger ideas together.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-8">
              <figure className="grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(180px,1fr)] md:items-center">
                <img
                  src="/images/beyond data/intel 1.jpg"
                  alt="Huyen Trang presenting technical work at Intel Products Vietnam"
                  width={2267}
                  height={1426}
                  className="h-auto w-full border border-[#432b37] object-contain"
                />
                <figcaption className="border-l border-[#432b37] pl-4 text-[11px] leading-6 text-[#806c76]">
                  Turning an idea into a conversation.
                </figcaption>
              </figure>
              <figure className="grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(180px,1fr)] md:items-center">
                <img
                  src="/images/beyond data/intel 2.jpg"
                  alt="A group gathering at an Intel Products Vietnam event"
                  width={2560}
                  height={1706}
                  className="h-auto w-full border border-[#432b37] object-contain"
                />
                <figcaption className="border-l border-[#432b37] pl-4 text-[11px] leading-6 text-[#806c76]">
                  Growth is rarely an individual story.
                </figcaption>
              </figure>
            </div>
          </div>
        </motion.article>
      </main>
    </div>
  );
};

export default BeyondData;
