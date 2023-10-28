const Nav = () => {
  return (
    <nav className="mx-auto w-full max-w-7xl py-2">
      <ul className="flex gap-4 font-medium">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/estimates/review">Review estimates</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
