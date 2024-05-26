import {
  Badge,
  CheckIcon,
  ChevronsUpDown,
  CircleUser,
  LucideIcon,
  Menu,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Store, User } from "@/types";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Dialog } from "../ui/dialog";

export interface TeamSwitcherProps extends PopoverTriggerProps {}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badgeCount?: number;
  active: boolean;
}
interface HeaderProps {
  user: User | null;
  stores: Store[];
  handleLogout: () => void;
  showNewTeamDialog: boolean;
  setShowNewTeamDialog: (show: boolean) => void;
  navLinks: NavLinkProps[];
  disabled: boolean;
}

const Header: React.FC<HeaderProps> = ({
  user,
  handleLogout,
  showNewTeamDialog,
  setShowNewTeamDialog,
  navLinks,
  disabled,
  stores,
}) => {
  const formmatedStore = stores.map((store) => ({
    label: "Teams",
    teams: [
      {
        label: store.name,
        value: store._id,
      },
    ],
  }));
  type Team = (typeof formmatedStore)[number]["teams"][number];
  const [open, setOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    formmatedStore?.[0].teams?.[0]
  );

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                icon={link.icon}
                label={link.label}
                badgeCount={link.badgeCount}
                active={link.active}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* Store Switcher */}
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a team"
                className={cn("w-[200px] justify-between")}
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                    alt={selectedTeam.label}
                    className="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {selectedTeam.label}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search team..." />
                  <CommandEmpty>No team found.</CommandEmpty>
                  {formmatedStore.map((store) => (
                    <CommandGroup key={store.label} heading={store.label}>
                      {store.teams.map((team) => (
                        <CommandItem
                          key={team.value}
                          onSelect={() => {
                            setSelectedTeam(team);
                            setOpen(false);
                          }}
                          className="text-sm"
                        >
                          <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${team.value}.png`}
                              alt={team.label}
                              className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          {team.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedTeam.value === team.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
                <CommandSeparator />
              </Command>
            </PopoverContent>
          </Popover>
        </Dialog>
      </div>

      <div className="flex-1">
        <nav className="flex justify-end px-2 text-sm font-medium lg:px-4">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              icon={link.icon}
              label={link.label}
              badgeCount={link.badgeCount}
              active={link.active}
            />
          ))}
        </nav>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user ? (
            <>
              <DropdownMenuItem>
                {user?.firstName + " " + user?.lastName}
              </DropdownMenuItem>
              <DropdownMenuItem>{user?.email}</DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link to={"/auth/register"}>Register</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {user ? (
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer"
              disabled={disabled}
            >
              Logout
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={disabled}
              asChild
            >
              <Link to={"/auth/login"}>Login</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badgeCount?: number;
  active: boolean;
}

export const NavLink = ({
  to,
  icon: Icon,
  label,
  badgeCount,
  active,
}: NavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      active ? "bg-muted text-primary" : "text-muted-foreground"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
    {badgeCount && (
      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        {badgeCount}
      </Badge>
    )}
  </Link>
);

export default Header;
