import MenuIcon from '@mui/icons-material/Menu';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';


const HomeNav = () => {
return (
    <div className=' fixed bg-[#0046A8] z-10'>
        <nav className=' mx-auto  text-white p-7 w-screen h-fit'>
            <div className='flex justify-between items-center'>
                <MenuIcon  />
                <h1 className='text-lg font-bold'>TravelApp</h1>
                <PersonSharpIcon />
            </div>
            
        </nav>
    </div>
)
}

export default HomeNav
