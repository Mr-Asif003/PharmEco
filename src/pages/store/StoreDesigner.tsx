import { useState } from "react";
import { motion } from "framer-motion";
import { PanelTop, PanelBottom, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorNavbar } from "@/components/store-designer/EditorNavbar";
import { ThemeLibraryPanel } from "@/components/store-designer/ThemeLibraryPanel";
import { ComponentsLibrary } from "@/components/store-designer/ComponentsLibrary";
import { EditorCanvas } from "@/components/store-designer/EditorCanvas";
import { PropertiesPanel } from "@/components/store-designer/PropertiesPanel";
import { PageManagement } from "@/components/store-designer/PageManagement";
import { HeaderFooterEditor } from "@/components/store-designer/HeaderFooterEditor";
import { ABTestingPanel } from "@/components/store-designer/ABTestingPanel";
import { AIDesignAssistant } from "@/components/store-designer/AIDesignAssistant";

const StoreDesigner = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isDark, setIsDark] = useState(false);
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("modern-orange");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [isHeaderFooterOpen, setIsHeaderFooterOpen] = useState(false);
  const [isABTestingOpen, setIsABTestingOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<any>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen bg-background ${isDark ? "dark" : ""}`}
    >
      {/* Top Navbar */}
      <EditorNavbar
        mode={mode}
        setMode={setMode}
        device={device}
        setDevice={setDevice}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Quick Actions Bar */}
      <div className="h-10 border-b bg-muted/30 flex items-center justify-center gap-2 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-2"
          onClick={() => setIsHeaderFooterOpen(true)}
        >
          <PanelTop className="h-3 w-3" />
          Header
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-2"
          onClick={() => setIsHeaderFooterOpen(true)}
        >
          <PanelBottom className="h-3 w-3" />
          Footer
        </Button>
        <div className="h-4 w-px bg-border" />
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-2"
          onClick={() => setIsABTestingOpen(true)}
        >
          <FlaskConical className="h-3 w-3" />
          A/B Testing
        </Button>
      </div>

      {/* Main Editor Layout */}
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Theme Library Panel (Collapsible) */}
        <ThemeLibraryPanel
          isOpen={isThemePanelOpen}
          setIsOpen={setIsThemePanelOpen}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />

        {/* Page Management */}
        <PageManagement
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Components Library (Edit mode only) */}
        {mode === "edit" && (
          <ComponentsLibrary
            onDragStart={(component) => setDraggedComponent(component)}
          />
        )}

        {/* Editor Canvas */}
        <EditorCanvas
          device={device}
          mode={mode}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />

        {/* Properties Panel (Edit mode only) */}
        {mode === "edit" && (
          <PropertiesPanel selectedElement={selectedElement} />
        )}
      </div>

      {/* Header/Footer Editor Modal */}
      <HeaderFooterEditor
        isOpen={isHeaderFooterOpen}
        onClose={() => setIsHeaderFooterOpen(false)}
      />

      {/* A/B Testing Panel Modal */}
      <ABTestingPanel
        isOpen={isABTestingOpen}
        onClose={() => setIsABTestingOpen(false)}
      />

      {/* AI Design Assistant */}
      <AIDesignAssistant
        isOpen={isAIAssistantOpen}
        setIsOpen={setIsAIAssistantOpen}
      />
    </motion.div>
  );
};

export default StoreDesigner;
