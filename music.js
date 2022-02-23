const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const KEY_STORAGE = "PLAYER_OPTION";

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $(".progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const saveSong = $(".btn-repeat");
const durationTimer = $(".duration");
const remainingTimer = $(".remaining");

const songIndex = $(".playlist");

const app = {
  currentIndex: 0,
  currentTime: 0,
  isPlaying: false,
  isRandom: false,
  isSave: false,
  config: JSON.parse(localStorage.getItem(KEY_STORAGE)) || {},
  songs: [
    {
      name: "Karik",
      singer: "3 thằng bạn",
      path: "./music/3thang.mp3",
      image: "./image/3thangban.jpg",
    },

    {
      name: "Táo",
      singer: "25",
      path: "./music/25.mp3",
      image: "./image/25.jpg",
    },
    {
      name: "Karik",
      singer: "Cạn cả nước mẳt",
      path: "./music/canca.mp3",
      image: "./image/canca.jpg",
    },
    {
      name: "Alan Walker",
      singer: "Force",
      path: "./music/Force.mp3",
      image: "./image/force.jpg",
    },
    {
      name: "Đen Vâu",
      singer: "Cho tôi lang thang",
      path: "./music/langthang.mp3",
      image: "./image/langthang.jpg",
    },
    {
      name: "Alan Walker",
      singer: "Next",
      path: "./music/next.mp3",
      image: "./image/next.jpg",
    },
    {
      name: "Lil Shady",
      singer: "Ngời đi qua",
      path: "./music/nguoidiqua.mp3",
      image: "./image/nguoidiqua.jpg",
    },
    {
      name: "Alan Walker",
      singer: "Play",
      path: "./music/play.mp3",
      image: "./image/play.jpg",
    },
    {
      name: "Alan Walker",
      singer: "Spectre",
      path: "./music/spectre.mp3",
      image: "./image/spectre.jpg",
    },
    {
      name: "Karik",
      singer: "Thương",
      path: "./music/thuong.mp3",
      image: "./image/thuong.jpg",
    },
    {
      name: "Karik",
      singer: "Cạn cả nước mẳt",
      path: "./music/canca.mp3",
      image: "./image/canca.jpg",
    },
    {
      name: "Đen Vâu",
      singer: "Cho tôi lang thang",
      path: "./music/langthang.mp3",
      image: "./image/langthang.jpg",
    },
    {
      name: "Karik",
      singer: "Cạn cả nước mẳt",
      path: "./music/canca.mp3",
      image: "./image/canca.jpg",
    },
    {
      name: "Changmie x Tiến Tới",
      singer: "Tình ka",
      path: "./music/mashup1.mp3",
      image: "./image/mashup1.png",
    },
    {
      name: "Changmie x Tiến Tới",
      singer: "Lòng ta mang giấc mơ trần gian",
      path: "./music/mashup2.mp3",
      image: "./image/mashup2.webp",
    },
    {
      name: "Changmie x Tiến Tới x Ca Ca",
      singer: "MASHUP 3",
      path: "./music/mashup3.mp3",
      image: "./image/mashup3.webp",
    },
    {
      name: "Tiến Tới x Ca Ca",
      singer: "MASHUP Giải Thoát Cho Nhau",
      path: "./music/mashup4.mp3",
      image: "./image/mashup4.png",
    },
    {
      name: "Changmie ",
      singer: "MASHUP Chill 6H Chiều",
      path: "./music/mashup5.mp3",
      image: "./image/mashup5.webp",
    },
    {
      name: "Teaser Audio",
      singer: "MASHUP hơn 10 bài HOT trên Tik Tok Phần 4",
      path: "./music/mashup6.mp3",
      image: "./image/mashup6.webp",
    },
    {
      name: "Changmie x Tiến Tới x HinG",
      singer: "Buông hàng",
      path: "./music/mashup7.mp3",
      image: "./image/mashup7.png",
    },
    {
      name: "Changmie x Tiến Tới x Ca Ca",
      singer: "Playlist 1 Hour",
      path: "./music/mashup8.mp3",
      image: "./image/mashup8.webp",
    },
    {
      name: "Changmie x Tiến Tới",
      singer: "MASHUP hơn 10 bài HOT trên Tik Tok P5",
      path: "./music/mashup9.mp3",
      image: "./image/mashup9.webp",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(KEY_STORAGE, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${
              index === this.currentIndex ? "active" : ""
            }"  data-index = "${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
            <h3 class="title">${song.singer}</h3>
            <p class="author">${song.name}</p>
            </div>
            <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
            </div>
            `;
    });

    $(".playlist").innerHTML = htmls.join("");
  },
  definePropertys: function () {
    //Tạo ra một thuộc tính mới là 'currentSong'  của đối tượng This(app)
    //get: function() {return....} : là lấy giá trị
    //set: function() {....} : là thêm giá trị...
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;

    //Xử lí quay cd

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });

    cdThumbAnimate.pause();

    document.onscroll = function () {
      //Kích thước thay đổi khi scroll lên xuống
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const newCdWidth = cdWidth - scrollTop;

      //khi cuộn nhanh newCdWidth sẽ về âm
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;

      //mờ dần
      cd.style.opacity = newCdWidth / cdWidth;
    };

    //Khi click nút play
    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //Khi bài hát được play
    audio.onplay = function () {
      app.isPlaying = true;
      $(".player").classList.add("playing");
      cdThumbAnimate.play();
    };

    //Khi bài hát bị pause
    audio.onpause = function () {
      app.isPlaying = false;
      $(".player").classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Thời gian bài hát thay đổi
    let checkOnmouse = true;
    progress.onmousedown = function () {
      //xảy ra khi click giữ chuột
      checkOnmouse = false;
    };

    audio.ontimeupdate = function () {
      remainingTimer.textContent = formatTime(audio.currentTime);
      if (!audio.duration) {
        durationTimer.textContent = `0:00`;
      } else {
        durationTimer.textContent = formatTime(audio.duration);
      }

      function formatTime(number) {
        let time;
        const minutes = Math.floor(number / 60);
        const seconds = Math.floor(number - minutes * 60);
        if (seconds < 10) {
          time = `${minutes}:0${seconds}`;
        } else {
          time = `${minutes}:${seconds}`;
        }
        return time;
      }

      if (audio.duration && checkOnmouse) {
        let progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
        if (progressPercent > 50) {
          document.documentElement.style.setProperty(
            "--width-progress",
            `${progressPercent - 0.5}%`
          );
        } else {
          document.documentElement.style.setProperty(
            "--width-progress",
            `${progressPercent + 1}%`
          );
        }
        app.setConfig("currentTime", audio.currentTime);
      }
    };

    //Xử lí khi tua bài hát

    //onchange: khi có sự thay đổi
    progress.onchange = function () {
      let progressCurrent = (progress.value * audio.duration) / 100;
      audio.currentTime = progressCurrent;
      checkOnmouse = true;
    };

    //khi click vào bài hát trong playlist
    songIndex.onclick = function (e) {
      //parents():sẽ bắt đầu tính những phần tử cha mà thôi chứ không bao gồm phần tử hiện tại,
      //          và nó sẽ trả về tất cả các parent tìm được

      //closest() :chạy ngược lên phía trên cây DOM để tìm những phần tử phù hợp,
      //           sẽ bắt đầu tìm kiếm từ phần tử hiện tại và đi ngược lên với kết quả trả về là phần tử đầu tiên phù hợp tìm được

      //:not(.active): không có class active
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        //Xử lí khi click bài hát
        if (songNode) {
          app.currentIndex = Number(songNode.dataset.index);
          app.loadCurrentSong();
          app.render();
          audio.play();
          app.setConfig("currentIndex", app.currentIndex);
        }
      }
    };

    //khi next bài hát xong
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      app.render();
      audio.play();
      window.scrollTo({
        top: songIndex.children[app.currentIndex].offsetTop,
        behavior: "smooth",
      });
    };

    //khi prev bài hát xong
    prevBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      app.render();
      // window.scrollTo(0, songIndex.children[app.currentIndex].offsetTop)
      window.scrollTo({
        top: songIndex.children[app.currentIndex].offsetTop,
        behavior: "smooth",
      });
    };

    //khi random bài hát

    randomBtn.onclick = function () {
      //thêm class active(chuyển sang màu đỏ)
      //toggle: thêm class active khi điều kiện là đúng
      app.isRandom = !app.isRandom;
      app.setConfig("isRandom", app.isRandom);
      randomBtn.classList.toggle("active", app.isRandom);
    };

    //lặp bài hát
    audio.onended = function () {
      if (!app.isSave) {
        nextBtn.click();
      } else {
        audio.play();
      }
    };

    saveSong.onclick = function () {
      app.isSave = !app.isSave;
      app.setConfig("isSave", app.isSave);
      saveSong.classList.toggle("active", app.isSave);
    };
  },
  loadConfig: function () {
    this.isSave = this.config.isSave;
    this.isRandom = this.config.isRandom;

    this.currentIndex = this.config.currentIndex || this.currentIndex;
    this.currentTime = this.config.currentTime || this.currentTime;
  },
  loadCurrentSong: async function () {
    heading.textContent = this.currentSong.singer;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;

    setTimeout(() => {
      let duration = audio.duration;
      console.log(">>>check time duration : ", duration);
      function formatTime(number) {
        let time;
        const minutes = Math.floor(number / 60);
        const seconds = Math.floor(number - minutes * 60);
        if (seconds < 10) {
          time = `${minutes}:0${seconds}`;
        } else {
          time = `${minutes}:${seconds}`;
        }
        return time;
      }

      if (!duration) {
        durationTimer.textContent = `0:00`;
      } else {
        durationTimer.textContent = formatTime(duration);
      }
    }, 200);

    if (this.currentIndex == this.config.currentIndex) {
      audio.currentTime = this.config.currentTime || 0;
    } else {
      audio.currentTime = 0;
    }

    this.setConfig("currentIndex", this.currentIndex);
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex == -1) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newSong;
    do {
      newSong = Math.floor(Math.random() * this.songs.length);
    } while (newSong === this.currentIndex);
    this.currentIndex = newSong;
    this.loadCurrentSong();
  },
  start: function () {
    //Khi load lại trang => các thuộc tính cũ vân được lưu
    this.loadConfig();

    //Định nghĩa thuộc tính cho object
    this.definePropertys();

    //Xử lí sự kiện event(DOM...)
    this.handleEvents();

    //Hiển thị bài hát đầu tiên
    this.loadCurrentSong();

    //Hiển thị danh sách bài hát
    this.render();

    randomBtn.classList.toggle("active", this.isRandom);
    saveSong.classList.toggle("active", this.isSave);
  },
};

app.start();
