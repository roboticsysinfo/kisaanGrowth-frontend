import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'; 
import { fetchShopById, updateShop, deleteShop } from '../../../redux/slices/shopSLice'; 

const ShopDetail = ({ shopId }) => {
    const dispatch = useDispatch();
    const { shop } = useSelector(state => state.shop);
    const [updatedShopDetails, setUpdatedShopDetails] = useState(shop || {});

    useEffect(() => {
        dispatch(fetchShopById(shopId));
    }, [dispatch, shopId]);

    const handleUpdate = async () => {
        try {
            await dispatch(updateShop(updatedShopDetails));
            toast.success("Shop updated successfully!");
        } catch (error) {
            toast.error("Error updating shop");
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteShop(shopId));
            toast.success("Shop deleted successfully!");
        } catch (error) {
            toast.error("Error deleting shop");
        }
    };

    return (
        <div>
            <h2>Shop Details</h2>
            {/* Display shop details */}
            <button className='btn btn-main d-inline-flex align-items-center rounded-pill gap-20 mt-24' onClick={handleUpdate}>Update Shop</button>
            <button className='btn btn-danger d-inline-flex align-items-center rounded-pill gap-20 mt-24' onClick={handleDelete}>Delete Shop</button>
        </div>
    );
};

export default ShopDetail;
