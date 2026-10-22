type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerButton({ isOpen, onClick, }: HamburgerButtonProps) {
  console.log("HamburgerButton render", isOpen);
  return(
    <div className={`hamburgerButton ${isOpen ? "active" : ""}`} onClick={onClick}>
      <span className="hamburgerButton_navIcon1"></span>
      <span className="hamburgerButton_navIcon2"></span>
    </div>
  )
}