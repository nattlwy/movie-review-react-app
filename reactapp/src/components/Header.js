import logo from '../placeholderlogo.png';

export default function Header() {
    return (
        <header>
            <h1><a href="/"><img src={logo} width="200"/></a></h1>
        </header>
    );
}
