import "./Portfolio.scss";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import NavSidebar from "/src/components/nav/desktop/NavSidebar.jsx";
import MainSlider from "/src/components/layout/MainSlider";
import NavHeaderMobile from "/src/components/nav/mobile/NavHeaderMobile.jsx";
import NavTabController from "/src/components/nav/mobile/NavTabController.jsx";
import NavPillsFixed from "/src/components/nav/mobile/NavPillsFixed.jsx";
import { useGlobalState } from "/src/providers/GlobalStateProvider.jsx";
import { useUtils } from "/src/helpers/utils.js";
import ProjectCard from "/src/components/generic/ProjectCard.jsx";
import GalleryModal from "/src/components/modals/GalleryModal.jsx";
import { useFeedbacks } from "/src/providers/FeedbacksProvider.jsx";

function Portfolio({ projects }) {
  const { getActiveSection, setFixedNavigationEnabled } = useGlobalState();
  const [isFirstPage, setIsFirstPage] = useState(true);
  const utils = useUtils();
  const { displayingGallery, hideGallery } = useFeedbacks();
  const portfolioRef = useRef(null);

  // Memoize utils and other frequently used values
  const isTouchDevice = useMemo(() => utils.isTouchDevice(), [utils]);
  const isAndroid = useMemo(() => utils.isAndroid(), [utils]);

  // On mount: add Android-specific body class (if needed)
  useEffect(() => {
    if (isTouchDevice && isAndroid) {
      utils.addClassToBody("body-android");
    }
  }, [isTouchDevice, isAndroid, utils]);

  // Store the active section to trigger scrolling when it changes
  const activeSection = getActiveSection();

  // Manage scrolling on active section change
  useEffect(() => {
    const top = 258;
    const scrollParams = { top, behavior: "auto" };

    // On the first render, mark initialization complete
    if (isFirstPage) {
      setIsFirstPage(false);
      return;
    }

    // If the page is already scrolled above the top threshold, do nothing
    if (window.scrollY < top) return;

    setFixedNavigationEnabled(false);
    window.scrollTo(scrollParams);

    const timer = setTimeout(() => {
      window.scrollTo(scrollParams);
      setFixedNavigationEnabled(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeSection, isFirstPage, setFixedNavigationEnabled]);

  // Memoize the project cards for performance
  const projectCards = useMemo(
    () =>
      projects &&
      projects.map((proj) => (
        <ProjectCard
          key={proj.id}
          img={proj.img}
          title={proj.title}
          subtitle={proj.subtitle}
          text={proj.text}
          links={proj.links}
          tags={proj.tags}
          options={[
            {
              id: "youtube",
              target: proj.media.youtubeVideo,
              label: "Watch Video",
            },
            {
              id: "gallery",
              target: {
                images: proj.media.screenshots.images,
                aspectRatio: proj.media.screenshots.aspectRatio,
              },
              label: "View Gallery",
            },
          ]}
        />
      )),
    [projects]
  );

  return (
    <div className="portfolio-wrapper" ref={portfolioRef}>
      <div className="portfolio" id="portfolio">
        <div className="sidebar-wrapper">
          <NavSidebar />
        </div>

        <div className="content-wrapper">
          <div className="content">
            <NavHeaderMobile />
            <MainSlider />
          </div>
        </div>

        <NavPillsFixed />

        <div className="nav-tabs-wrapper">
          <NavTabController />
        </div>
      </div>

      <div className="portfolio-page">
        {projectCards}
        <GalleryModal
          displayingGallery={displayingGallery}
          hideGallery={hideGallery}
        />
      </div>
    </div>
  );
}

export default Portfolio;