import { Link, useNavigate } from "react-router-dom";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog"; // ✅ Added for accessibility
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Dashboard from "./sub-components/Dashboard";
import AddSkill from "./sub-components/AddSkill";
import AddProject from "./sub-components/AddProject";
import AddSoftwareApplications from "./sub-components/AddSoftwareApplications";
import Account from "./sub-components/Account";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import Messages from "./sub-components/Messages";
import AddTimeline from "./sub-components/AddTimeline";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard"); // ✅ Set default to "Dashboard"
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      // ✅ Removed `clearAllUserErrors()` as it's not defined
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated, error, navigateTo]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {/* ✅ Navigation Links */}
          {[
            { name: "Dashboard", icon: Home },
            { name: "Add Project", icon: FolderGit },
            { name: "Add Skill", icon: PencilRuler },
            { name: "Add Uses", icon: LayoutGrid },
            { name: "Add Timeline", icon: History },
            { name: "Messages", icon: MessageSquareMore },
            { name: "Account", icon: User },
          ].map(({ name, icon: Icon }) => (
            <TooltipProvider key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === name
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive(name)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">{name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        {/* ✅ Logout Button */}
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* ✅ Mobile Menu */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="sm:max-w-xs">
            <DialogTitle className="sr-only">Navigation Menu</DialogTitle>{" "}
            {/* ✅ Added for Accessibility */}
            <nav className="grid gap-6 text-lg font-medium">
              {[
                { name: "Dashboard", icon: Home },
                { name: "Add Project", icon: FolderGit },
                { name: "Add Skill", icon: PencilRuler },
                { name: "Add Uses", icon: LayoutGrid },
                { name: "Add Timeline", icon: History },
                { name: "Messages", icon: MessageSquareMore },
                { name: "Account", icon: User },
              ].map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  className={`flex items-center gap-4 px-2.5 ${
                    active === name
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive(name)}
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </button>
              ))}

              <button
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* ✅ User Info */}
        <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
          {user?.avatar?.url && (
            <img
              src={user.avatar.url}
              alt="avatar"
              className="w-20 h-20 rounded-full max-[900px]:hidden"
            />
          )}
          <h1 className="text-4xl max-[900px]:text-2xl">
            Welcome back, {user?.fullName || "User"}
          </h1>
        </div>
      </header>

      {/* ✅ Dynamic Component Rendering */}
      {(() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard />;
          case "Add Project":
            return <AddProject />;
          case "Add Skill":
            return <AddSkill />;
          case "Add Uses":
            return <AddSoftwareApplications />;
          case "Add Timeline":
            return <AddTimeline />;
          case "Messages":
            return <Messages />;
          case "Account":
            return <Account />;
          default:
            return <Dashboard />;
        }
      })()}
    </div>
  );
};

export default HomePage;
