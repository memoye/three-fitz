import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download, logoShirt, stylishShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import toast from "react-hot-toast";

export default function Customizer() {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the active tab
  function generateTabContent() {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  }

  async function handleSubmit(type) {
    if (!prompt) return alert`Please enter a prompt`;

    try {
      // call backend to generate AI image
      setGeneratingImg(true);
      const response = await fetch(config.AIEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
        // mode: "cors",
      });

      const data = await response.json();
      // console.log(data);

      handleDecals(type, data?.data);

      // if (data.image)
      // console.log(data.error.error.message);
      // if (data.error)
      // throw Error(data?.error?.error?.message || "Something went wrong");
    } catch (error) {
      toast.error(String(error), {
        icon: "❌",
        style: {
          borderRadius: "5px",
          background: "#330000ee",
          border: "1px solid red",
          color: "#fff",
        },
      });
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  function handleActiveFilterTab(tabName) {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, set the activeFilterTab to update the UI

    setActiveFilterTab((prev) => {
      return {
        ...prev,
        [tabName]: !prev[tabName],
      };
    });
  }

  function handleDecals(type, result) {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  function readFile(type) {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute left-0 top-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex min-h-screen items-center ">
              <div className="editortabs-container tabs">
                {EditorTabs.map((t) => (
                  <Tab
                    key={t.name}
                    tab={t}
                    handleClick={() => setActiveEditorTab(t.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute right-5 top-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((t) => (
              <Tab
                key={t.name}
                tab={t}
                isFilterTab
                isActiveTab={activeFilterTab[t.name]}
                handleClick={() => handleActiveFilterTab(t.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
