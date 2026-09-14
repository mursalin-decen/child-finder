export default function Footer() {
    return (
        <footer className="w-full bg-slate-900 border-t border-slate-800 py-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} People Finder Platform. All rights reserved.</p>
            <p>Somewhere behind the code — MR. Stranger</p>
        </footer>
    );
}