import Image from "next/image";
import logo from "@/public/logos/logo.png";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between mt-4 mb-8">
      <Link href={"/"}>
        <Image
          priority
          src={logo}
          width={250}
          height={250}
          alt="Logo"
          className="hover:cursor-pointer w-44 md:w-auto"
        />
      </Link>
      {/* Medium to large screen signed out  */}
      <div>
        <div className="md:hidden mx-4">
          <SignedOut>
            <Button>
              <SignInButton/>
            </Button>
          </SignedOut>
        </div>
        <div className="hidden md:flex md:mx-4">
          <SignedOut>
            <Button className="flex items-center gap-1">
              <SignInButton /><LogIn className="size-5"/>
            </Button>
          </SignedOut>
        </div>
        {/* Medium to large screen signed out  */}

        {/* Mobile screen signed in button  */}

        <div className="md:hidden px-4">
          <SignedIn>
            <Sheet>
              <SheetTrigger>
                <HamburgerMenuIcon className="size-5" />
              </SheetTrigger>
              <SheetContent className="bg-slate-100">
                <SheetHeader>
                  <SheetTitle>
                    <h3 className="text-slate-950 font-semibold text-xl mb-4">
                      Menu
                    </h3>
                  </SheetTitle>
                </SheetHeader>
                <SheetDescription className="flex items-start flex-col gap-4">
                  <h3>About</h3>
                  <h3>Newsletter</h3>
                  <h3>Blogs</h3>
                  <h3>Products</h3>
                  <Button variant={"destructive"}>
                    <SignOutButton />
                  </Button>
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </SignedIn>
        </div>

        {/* Mobile screen signed in button  */}

        {/* Medium to large screen signed in button  */}
        <div className="md:flex items-center gap-2 font-medium hidden">
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
        {/* Medium to large screen signed in button  */}
      </div>
    </nav>
  );
};

export default Navbar;
