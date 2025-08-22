window.addEventListener("DOMContentLoaded", () => {
  const quoteText = document.querySelector(".quote"),
        quoteBtn = document.querySelector("button"),
        authorName = document.querySelector(".name"),
        speechBtn = document.querySelector(".speech"),
        copyBtn = document.querySelector(".copy"),
        discordBtn = document.querySelector(".discord"),
        synth = "speechSynthesis" in window ? window.speechSynthesis : null;

  // Array quote dari data siswa XII-1 + Maharino Ariel Ivena
  const quotes = [
    { content: "Adapt or Die!", author: "Maharino Ariel Ivena" },
    { content: "meskipun jenuh, jorong-jorong tetap nomor 1", author: "Raifal Amri" },
    { content: "Orang bilang aku gila, tapi sebenarnya aku hanya melihat dunia ini dari sudut yang berbeda", author: "DE ROYAN ALMUZAFAR" },
    { content: "One day or day one.", author: "Hariz Thoriq As-Shidqi" },
    { content: "Hidup bukan hanya tentang sempurna, melainkan tentang belajar, menerima, memaafkan, bersyukur, dan tumbuh.", author: "Firda Sari" },
    { content: "Hiduplah walau plot armor tidak menyertai", author: "Muhammad Chulaifi Putra Pamungkas" },
    { content: "Long Anies, Short Prabowo", author: "Fahri Nur Pratama" },
    { content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Ervina Mariyati" },
    { content: "Tidak perlu lebih baik dari orang lain, kamu hanya perlu lebih baik dari dirimu kemarin", author: "Gilbert Samuel Pasaribu" },
    { content: "Bersukacitalah dalam pengharapan, sabarlah dalam kesesakan dan bertekunlah dalam doa.", author: "Ragil Valentino Trisakti" },
    { content: "Manusia selalu punya rahasia dan bagian-bagian rapuh dalam diri mereka, bagaimana bagian-bagian paling istimewa yang menjadikannya berharga.", author: "Nikita Kusuma Wardani" },
    { content: "Target it and try to get it, even if it's impossible", author: "Tubagus Fahri Rizky Anugrah" },
    { content: "Setiap kamu merasa putus asa, ingatlah bahwa rencana Tuhan lebih baik daripada mimpimu.", author: "Diva Aghnia" },
    { content: "Jangan menunggu sempurna untuk mulai, karena memulai adalah langkah menuju kesempurnaan.", author: "Yoel Nicholas Simarmata" },
    { content: "Tetap lah bersujud walaupun mimpumu sudah terwujud", author: "Meirunisa Murtafiah" },
    { content: "Hidup cuma sekali, do whatever you want.", author: "Anastasya Saharani" },
    { content: "Dunia boleh saja menahan ku, kupunya Doa Ibu -Tapi", author: "Farel Fanrabi" },
    { content: "Don't say you can't before you try, jangan belajar dengan takut akan kegagalan, tapi belajarlah bersama harapan dari sebuah keberhasilan.", author: "Arie Wiratama Tasha" },
    { content: "...thats ever been mine.", author: "Danish Hadwan Azfar Nabil" },
    { content: "Overthinking will ruin your peace. Pray and leave it to God.", author: "Johanes William Moller" },
    { content: "And we'll find love through the ages, as time goes by", author: "Bintang Adhitya Tama" },
    { content: "Jangan lupa self-reward", author: "Ririn" },
    { content: "It's fine to fake it 'til you make it 'til you do, 'til it's true", author: "Nasyla Handayani" },
    { content: "To love and lose and still be kind", author: "Radiva Rahmanisa" },
    { content: "Born on Teachers’ Day, raised in their wisdom, and guided by their light", author: "Arsyad Ahmad Fathy Al-Baihaqi" },
    { content: "Awalilah hari-hari dengan doa karena doa udah dipastikan hidup kita tidak pernah segelap goa", author: "Muhammad Haidar Akbar" },
    { content: "This is the very first page not where the storyline ends", author: "Muhammad Fadli" },
    { content: "You know that you'll always be my sunshine", author: "Daffa Achmad Kautsar" },
    { content: "Hiduplah sebagaimana mestinya", author: "Talitha Anindya Salsabila" },
    { content: "Everything you lose is a step you take", author: "Rossa Maria Gultom" },
    { content: "Jadilah seperti bunga yang memberi keharuman bahkan kepada yang meremasnya", author: "Abisali Faiq Mustaqim" },
    { content: "Lebih mudah menebak pikiran orang pintar, dari pada orang bodoh.", author: "Faishal Ammar Ardian" }
  ];

  // Shuffle array untuk urutan acak awal
  let shuffledQuotes = [...quotes];
  let currentIndex = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(shuffledQuotes);

  // Fungsi ambil quote tanpa duplikat sampai habis, baru shuffle lagi
  function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    if (currentIndex >= shuffledQuotes.length) {
      shuffleArray(shuffledQuotes);
      currentIndex = 0;
    }

    const currentQuote = shuffledQuotes[currentIndex];
    quoteText.innerText = currentQuote.content;
    authorName.innerText = currentQuote.author;
    currentIndex++;

    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "Next Quote";
  }

  // 🔊 Speech synthesis
  if (synth && speechBtn) {
    speechBtn.addEventListener("click", () => {
      if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(
          `${quoteText.innerText} by ${authorName.innerText}`
        );
        synth.cancel();
        synth.speak(utterance);

        let checkSpeaking = setInterval(() => {
          if (!synth.speaking) {
            speechBtn.classList.remove("active");
            clearInterval(checkSpeaking);
          } else {
            speechBtn.classList.add("active");
          }
        }, 100);
      }
    });
  }

  // 📋 Copy
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(quoteText.innerText);
    });
  }

  // 🐦 Discord share
  if (discordBtn) {
    discordBtn.addEventListener("click", () => {
      let discordUrl = `https://discord.com/users/755071629389856848?quote=${encodeURIComponent(
        quoteText.innerText + " - " + authorName.innerText
      )}`;
      window.open(discordUrl, "_blank");
    });
  }

  // 🔄 Ambil quote baru saat klik button
  if (quoteBtn) {
    quoteBtn.addEventListener("click", randomQuote);
  }

  // 🚀 Ambil 1 quote di awal
  randomQuote();
});
