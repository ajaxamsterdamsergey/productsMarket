import { ThreeDots } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

const Loader = (): JSX.Element => {
const Spinner = (
<Wrapper>
<ThreeDots
     height={100}
     width={100}
     radius={12}
     color="#3f51b5"
     ariaLabel="three-dots-loading"
     wrapperStyle={{}}
    //  wrapperClassName=""
     visible={true}
   />
</Wrapper>
);
return Spinner;
};

export default Loader;