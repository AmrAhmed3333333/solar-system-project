"use client";
import "@/app/solar-system.css";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type PlanetInfo = {
  id: string;
  name: string;
  arabic: string;
  order: string;
  color: string;
  texture: string;
  radius: number;
  distance: number;
  speed: number;
  rotation: number;
  diameter: string;
  day: string;
  year: string;
  temperature: string;
  moons: string;
  description: string;
  arabicDescription: string;
  fact: string;
  arabicFact: string;
};

const planets: PlanetInfo[] = [
  {
    id: "mercury",
    name: "Mercury",
    arabic: "عطارد",
    order: "01",
    color: "#aaa49b",
    texture: "/textures/mercury.jpg",
    radius: 0.34,
    distance: 4.0,
    speed: 0.95,
    rotation: 0.004,
    diameter: "4,879 km",
    day: "58.6 Earth days",
    year: "88 Earth days",
    temperature: "-180°C to 430°C",
    moons: "0",
    description: "Mercury is the smallest planet in our solar system and the closest planet to the Sun. Its surface is covered with craters.",
    arabicDescription: "عطارد هو أصغر كواكب المجموعة الشمسية وأقربها إلى الشمس. يتميز بسطحه المليء بالفوهات الناتجة عن اصطدام النيازك.",
    fact: "A year on Mercury lasts only 88 Earth days.",
    arabicFact: "السنة على عطارد تستغرق 88 يومًا أرضيًا فقط."
  },
  {
    id: "venus",
    name: "Venus",
    arabic: "الزهرة",
    order: "02",
    color: "#d9a66d",
    texture: "/textures/venus.jpg",
    radius: 0.57,
    distance: 5.8,
    speed: 0.72,
    rotation: 0.002,
    diameter: "12,104 km",
    day: "243 Earth days",
    year: "225 Earth days",
    temperature: "About 465°C",
    moons: "0",
    description: "Venus is the hottest planet in our solar system. Its thick atmosphere traps heat through an extreme greenhouse effect.",
    arabicDescription: "الزهرة هو أكثر كواكب المجموعة الشمسية حرارة. يمتلك غلافًا جويًا كثيفًا يحبس الحرارة بسبب ظاهرة الاحتباس الحراري الشديدة.",
    fact: "Venus rotates in the opposite direction to most planets.",
    arabicFact: "يدور كوكب الزهرة في اتجاه معاكس لمعظم الكواكب."
  },
  {
    id: "earth",
    name: "Earth",
    arabic: "الأرض",
    order: "03",
    color: "#298bd9",
    texture: "/textures/earth.jpg",
    radius: 0.62,
    distance: 7.8,
    speed: 0.58,
    rotation: 0.012,
    diameter: "12,742 km",
    day: "24 hours",
    year: "365.25 days",
    temperature: "Average 15°C",
    moons: "1",
    description: "Earth is our home planet. It is the only known planet with life and has liquid water on its surface.",
    arabicDescription: "الأرض هي كوكبنا، وهي الكوكب الوحيد المعروف حتى الآن بوجود حياة عليه، كما تحتوي على مياه سائلة على سطحها.",
    fact: "About 71% of Earth's surface is covered by water.",
    arabicFact: "تغطي المياه حوالي 71% من سطح الأرض."
  },
  {
    id: "mars",
    name: "Mars",
    arabic: "المريخ",
    order: "04",
    color: "#c75b3d",
    texture: "/textures/mars.jpg",
    radius: 0.46,
    distance: 10.0,
    speed: 0.46,
    rotation: 0.01,
    diameter: "6,779 km",
    day: "24.6 hours",
    year: "687 Earth days",
    temperature: "Average -65°C",
    moons: "2",
    description: "Mars is known as the Red Planet because of iron-rich dust on its surface. Scientists are exploring whether it could have supported ancient life.",
    arabicDescription: "يُعرف المريخ بالكوكب الأحمر بسبب الغبار الغني بأكاسيد الحديد على سطحه. يدرس العلماء إمكانية وجود حياة قديمة عليه.",
    fact: "Mars has the largest volcano in the solar system: Olympus Mons.",
    arabicFact: "يوجد على المريخ أكبر بركان معروف في المجموعة الشمسية، وهو جبل أوليمبوس."
  },
  {
    id: "jupiter",
    name: "Jupiter",
    arabic: "المشتري",
    order: "05",
    color: "#d4a47d",
    texture: "/textures/jupiter.jpg",
    radius: 1.22,
    distance: 14.0,
    speed: 0.25,
    rotation: 0.018,
    diameter: "139,820 km",
    day: "About 10 hours",
    year: "11.86 Earth years",
    temperature: "Cloud tops: -110°C",
    moons: "Many known moons",
    description: "Jupiter is the largest planet in our solar system. Its atmosphere contains enormous storms, including the famous Great Red Spot.",
    arabicDescription: "المشتري هو أكبر كواكب المجموعة الشمسية. يحتوي غلافه الجوي على عواصف ضخمة، أشهرها البقعة الحمراء العظيمة.",
    fact: "Jupiter is so massive that all other planets could fit inside it.",
    arabicFact: "كتلة المشتري هائلة لدرجة أن جميع الكواكب الأخرى يمكن أن تتسع داخله من حيث الحجم."
  },
  {
    id: "saturn",
    name: "Saturn",
    arabic: "زحل",
    order: "06",
    color: "#d6bc86",
    texture: "/textures/saturn.jpg",
    radius: 1.02,
    distance: 18.5,
    speed: 0.18,
    rotation: 0.016,
    diameter: "116,460 km",
    day: "About 10.7 hours",
    year: "29.4 Earth years",
    temperature: "About -140°C",
    moons: "Many known moons",
    description: "Saturn is famous for its spectacular rings made mostly of ice and rocky particles. It is a gas giant with a very low average density.",
    arabicDescription: "يشتهر زحل بحلقاته الرائعة المكونة في معظمها من الجليد والمواد الصخرية. وهو عملاق غازي منخفض الكثافة.",
    fact: "Saturn's average density is lower than water.",
    arabicFact: "متوسط كثافة زحل أقل من كثافة الماء."
  },
  {
    id: "uranus",
    name: "Uranus",
    arabic: "أورانوس",
    order: "07",
    color: "#83d7d9",
    texture: "/textures/uranus.jpg",
    radius: 0.78,
    distance: 22.5,
    speed: 0.12,
    rotation: 0.01,
    diameter: "50,724 km",
    day: "About 17 hours",
    year: "84 Earth years",
    temperature: "About -195°C",
    moons: "Many known moons",
    description: "Uranus is an ice giant with a blue-green appearance caused by methane in its atmosphere. It rotates almost on its side.",
    arabicDescription: "أورانوس عملاق جليدي يظهر باللون الأزرق المخضر بسبب غاز الميثان في غلافه الجوي، ويدور تقريبًا على جانبه.",
    fact: "Uranus has an extreme axial tilt of about 98 degrees.",
    arabicFact: "يمتلك أورانوس ميلًا محوريًا شديدًا يبلغ حوالي 98 درجة."
  },
  {
    id: "neptune",
    name: "Neptune",
    arabic: "نبتون",
    order: "08",
    color: "#416fe0",
    texture: "/textures/neptune.jpg",
    radius: 0.75,
    distance: 26.0,
    speed: 0.09,
    rotation: 0.012,
    diameter: "49,244 km",
    day: "About 16 hours",
    year: "165 Earth years",
    temperature: "About -200°C",
    moons: "Many known moons",
    description: "Neptune is the most distant major planet from the Sun. It is a deep blue ice giant with extremely powerful winds.",
    arabicDescription: "نبتون هو أبعد الكواكب الرئيسية عن الشمس. يتميز بلونه الأزرق العميق ورياحه شديدة القوة.",
    fact: "Neptune has some of the fastest winds in the solar system.",
    arabicFact: "يمتلك نبتون بعضًا من أسرع الرياح في المجموعة الشمسية."
  }
];

export default function SolarSystemExplorer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<PlanetInfo | null>(null);
  const [paused, setPaused] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const pausedRef = useRef(false);
  const selectedRef = useRef<PlanetInfo | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
    } catch {
      container.innerHTML =
        '<div class="space-error">Your browser could not start the 3D experience. Please enable WebGL or try another browser.</div>';
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030711");

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      150
    );

    camera.position.set(0, 25, 36);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambient);

    const sunlight = new THREE.PointLight(0xffd7a0, 190, 95, 1.6);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);

    const textureLoader = new THREE.TextureLoader();
    const planetMeshes: {
      mesh: THREE.Mesh;
      info: PlanetInfo;
      angle: number;
      orbit: number;
    }[] = [];

    const sunGeometry = new THREE.SphereGeometry(1.85, 64, 64);
    let sunMaterial: THREE.MeshBasicMaterial;

    try {
      const sunTexture = textureLoader.load("/textures/sun.jpg");
      sunTexture.colorSpace = THREE.SRGBColorSpace;
      sunMaterial = new THREE.MeshBasicMaterial({
        map: sunTexture
      });
    } catch {
      sunMaterial = new THREE.MeshBasicMaterial({
        color: "#ffad35"
      });
    }

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const sunGlow = new THREE.Mesh(
      new THREE.SphereGeometry(2.12, 32, 32),
      new THREE.MeshBasicMaterial({
        color: "#ff9b38",
        transparent: true,
        opacity: 0.13,
        side: THREE.BackSide
      })
    );
    scene.add(sunGlow);

    // Star field
    const starPositions: number[] = [];
    for (let i = 0; i < 2200; i++) {
      const radius = 35 + Math.random() * 65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: "#d9e7ff",
        size: 0.13,
        transparent: true,
        opacity: 0.8
      })
    );
    scene.add(stars);

    // Planet orbits and planet meshes
    planets.forEach((planet, index) => {
      const orbitGeometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= 160; i++) {
        const angle = (i / 160) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * planet.distance,
            0,
            Math.sin(angle) * planet.distance
          )
        );
      }

      orbitGeometry.setFromPoints(points);

      const orbitLine = new THREE.LineLoop(
        orbitGeometry,
        new THREE.LineBasicMaterial({
          color: "#53657f",
          transparent: true,
          opacity: 0.31
        })
      );
      scene.add(orbitLine);

      const geometry = new THREE.SphereGeometry(
        planet.radius,
        48,
        48
      );

      const material = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.9,
        metalness: 0.02
      });

      const texture = textureLoader.load(
        planet.texture,
        () => setLoaded(true),
        undefined,
        () => {
          console.warn("Planet texture unavailable:", planet.id);
        }
      );

      texture.colorSpace = THREE.SRGBColorSpace;
      material.map = texture;
      material.color.set("#ffffff");
      material.needsUpdate = true;

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.planetId = planet.id;

      const initialAngle = index * 0.82 + 0.3;
      mesh.position.set(
        Math.cos(initialAngle) * planet.distance,
        0,
        Math.sin(initialAngle) * planet.distance
      );

      scene.add(mesh);

      if (planet.id === "saturn") {
        const ringGeometry = new THREE.RingGeometry(
          planet.radius * 1.35,
          planet.radius * 2.05,
          80
        );

        const ringMaterial = new THREE.MeshBasicMaterial({
          color: "#d9c39b",
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.72
        });

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 2.35;
        mesh.add(ring);
      }

      planetMeshes.push({
        mesh,
        info: planet,
        angle: initialAngle,
        orbit: planet.distance
      });
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      const intersections = raycaster.intersectObjects(
        planetMeshes.map((item) => item.mesh),
        false
      );

      if (intersections.length > 0) {
        const id = intersections[0].object.userData.planetId;
        const planet = planets.find((item) => item.id === id);

        if (planet) {
          setSelected(planet);
        }
      }
    };

    renderer.domElement.addEventListener("dblclick", onClick);

    // Zoom with mouse wheel
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(
        camera.position.z + event.deltaY * 0.012,
        17,
        58
      );
    };

    renderer.domElement.addEventListener("wheel", onWheel, {
      passive: false
    });

    const onResize = () => {
      if (!container) return;

      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 300);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!pausedRef.current) {
        sun.rotation.y += 0.0018;
        stars.rotation.y += 0.000035;

        planetMeshes.forEach((item) => {
          item.angle += item.info.speed * 0.0009;

          item.mesh.position.x =
            Math.cos(item.angle) * item.orbit;

          item.mesh.position.z =
            Math.sin(item.angle) * item.orbit;

          item.mesh.rotation.y += item.info.rotation;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("dblclick", onClick);
      renderer.domElement.removeEventListener("wheel", onWheel);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineLoop) {
          object.geometry.dispose();

          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const closePlanet = () => setSelected(null);

  return (
    <main className="solar-page" dir={arabic ? "rtl" : "ltr"}>
      <div className="space-background" />

      <header className="solar-header">
        <Link href="/" className="solar-brand">
          <span className="brand-symbol">✦</span>
          <span>SOLAR<span className="brand-light">EXPLORER</span></span>
        </Link>

        <div className="header-actions">
          <a
            className="nasa-link"
            href="https://science.nasa.gov/solar-system/"
            target="_blank"
            rel="noreferrer"
          >
            NASA SCIENCE ↗
          </a>

          <button
            className="language-button"
            onClick={() => setArabic(!arabic)}
          >
            {arabic ? "English" : "العربية"}
          </button>
        </div>
      </header>

      <section className="solar-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            {arabic ? "رحلة تفاعلية لاستكشاف الفضاء" : "INTERACTIVE SPACE EXPERIENCE"}
          </div>

          <h1>
            {arabic ? (
              <>اكتشف <span>المجموعة الشمسية</span></>
            ) : (
              <>Explore Our <span>Solar System</span></>
            )}
          </h1>

          <p>
            {arabic
              ? "انطلق في رحلة بين الكواكب، واكتشف أسرار عالمنا الفضائي. اضغط على أي كوكب لتتعرف عليه."
              : "Journey through our cosmic neighborhood. Discover fascinating worlds, explore planetary facts and uncover the secrets of space."}
          </p>

          <div className="hero-stats">
            <div>
              <strong>08</strong>
              <span>{arabic ? "كواكب" : "PLANETS"}</span>
            </div>
            <div>
              <strong>01</strong>
              <span>{arabic ? "نجم" : "STAR"}</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>{arabic ? "أسرار" : "DISCOVERIES"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="explorer-section">
        <div className="explorer-heading">
          <div>
            <span className="section-kicker">
              {arabic ? "المحاكاة ثلاثية الأبعاد" : "3D INTERACTIVE SIMULATION"}
            </span>
            <h2>{arabic ? "استكشف الكواكب" : "Explore the Planets"}</h2>
            <p>
              {arabic
                ? "اضغط ضغطتين متتاليتين على أي كوكب لفتح نافذة المعلومات الخاصة به."
                : "Double-click any planet in the simulation to reveal its story and scientific facts."}
            </p>
          </div>

          <button
            className="motion-button"
            onClick={() => setPaused(!paused)}
          >
            {paused ? "▶ " : "Ⅱ "}
            {paused
              ? (arabic ? "استئناف الحركة" : "Resume Motion")
              : (arabic ? "إيقاف الحركة" : "Pause Motion")}
          </button>
        </div>

        <div className="solar-canvas-wrap">
          <div className="canvas-hint">
            <span className="hint-dot" />
            {arabic ? "اضغط ضغطتين على الكوكب لاستكشافه" : "DOUBLE-CLICK A PLANET TO EXPLORE"}
          </div>

          {!loaded && (
          <div className="canvas-loading">
            {arabic ? "جاري تجهيز الرحلة..." : "PREPARING YOUR JOURNEY..."}
          </div>
          )}

          <div ref={mountRef} className="solar-canvas" />

          <div className="canvas-bottom-label">
            {arabic ? "نموذج توضيحي — المسافات والأحجام غير مقياسية" : "ILLUSTRATIVE MODEL — DISTANCES AND SIZES NOT TO SCALE"}
          </div>
        </div>
      </section>

      <section className="planet-directory">
        <div className="directory-heading">
          <span className="section-kicker">
            {arabic ? "دليل الكواكب" : "PLANET DIRECTORY"}
          </span>
          <h2>{arabic ? "تعرف على عوالمنا" : "Meet Our Worlds"}</h2>
        </div>

        <div className="planet-grid">
          {planets.map((planet) => (
            <button
              className="planet-card"
              key={planet.id}
              onClick={() => setSelected(planet)}
            >
              <span
                className={`planet-preview preview-${planet.id}`}
                style={{ backgroundColor: planet.color }}
              />
              <span className="planet-card-text">
                <strong>{arabic ? planet.arabic : planet.name}</strong>
                <small>
                  {arabic ? `الكوكب رقم ${planet.order}` : `PLANET ${planet.order}`}
                </small>
              </span>
              <span className="planet-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mission-banner">
        <div>
          <span className="section-kicker">
            {arabic ? "هل أنت مستعد؟" : "READY FOR THE NEXT MISSION?"}
          </span>
          <h2>
            {arabic ? "اختبر معلوماتك عن الفضاء" : "Test Your Space Knowledge"}
          </h2>
          <p>
            {arabic
              ? "بعد استكشاف الكواكب، اختبر ما تعلمته في الاختبار التفاعلي."
              : "Put your planetary knowledge to the test with our interactive quiz."}
          </p>
        </div>

        <a href="/quiz" className="mission-button">
          {arabic ? "ابدأ الاختبار" : "Start the Quiz"} <span>→</span>
        </a>
      </section>

      <footer className="solar-footer">
        <div>
          <strong>SOLAR EXPLORER</strong>
          <p>
            {arabic
              ? "رحلتك التعليمية إلى أعماق المجموعة الشمسية."
              : "An educational journey through our solar system."}
          </p>
        </div>

        <div className="credits">
          <span>Planetary texture maps: Solar System Scope (CC BY 4.0)</span>
          <a
            href="https://science.nasa.gov/solar-system/"
            target="_blank"
            rel="noreferrer"
          >
            NASA Solar System Resources
          </a>
        </div>
      </footer>

      {selected && (
        <div
          className="planet-modal-overlay"
          onClick={closePlanet}
          role="presentation"
        >
          <article
            className="planet-modal"
            role="dialog"
            aria-modal="true"
            aria-label={arabic ? selected.arabic : selected.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closePlanet}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-topline">
              <span className="section-kicker">
                {arabic ? `الكوكب رقم ${selected.order}` : `PLANET ${selected.order}`}
              </span>
              <span className="modal-status">
                <span className="live-dot" />
                {arabic ? "تم الاختيار" : "SELECTED"}
              </span>
            </div>

            <div className="modal-main">
              <div className="modal-planet-visual">
                <div
                  className={`modal-planet-sphere preview-${selected.id}`}
                  style={{ backgroundColor: selected.color }}
                />
                <span className="modal-orbit-ring" />
              </div>

              <div className="modal-info">
                <h2>{arabic ? selected.arabic : selected.name}</h2>
                <span className="modal-english-name">
                  {arabic ? selected.name : `THE ${selected.name.toUpperCase()}`}
                </span>

                <p>
                  {arabic
                    ? selected.arabicDescription
                    : selected.description}
                </p>

                <div className="fact-highlight">
                  <span>✦ {arabic ? "هل تعلم؟" : "DID YOU KNOW?"}</span>
                  <p>{arabic ? selected.arabicFact : selected.fact}</p>
                </div>
              </div>
            </div>

            <div className="modal-data-grid">
              <div className="data-item">
                <span>{arabic ? "القطر" : "DIAMETER"}</span>
                <strong>{selected.diameter}</strong>
              </div>

              <div className="data-item">
                <span>{arabic ? "طول اليوم" : "DAY LENGTH"}</span>
                <strong>{selected.day}</strong>
              </div>

              <div className="data-item">
                <span>{arabic ? "طول السنة" : "YEAR LENGTH"}</span>
                <strong>{selected.year}</strong>
              </div>

              <div className="data-item">
                <span>{arabic ? "درجة الحرارة" : "TEMPERATURE"}</span>
                <strong>{selected.temperature}</strong>
              </div>

              <div className="data-item">
                <span>{arabic ? "الأقمار" : "KNOWN MOONS"}</span>
                <strong>{selected.moons}</strong>
              </div>

              <div className="data-item">
                <span>{arabic ? "الترتيب من الشمس" : "ORDER FROM SUN"}</span>
                <strong>{selected.order}</strong>
              </div>
            </div>

            <div className="modal-bottom">
              <span>
                {arabic
                  ? "المعلومات العلمية: NASA"
                  : "Scientific reference: NASA"}
              </span>

              <button onClick={closePlanet}>
                {arabic ? "العودة للاستكشاف" : "Back to Exploration"}
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}