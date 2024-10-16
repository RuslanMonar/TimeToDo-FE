import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import tasksGateway from "../gateways/tasksGateway";

const RecommendationsModal = ({ handleOpen, openModal }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            var result = await tasksGateway.GetRecomendations();
            setRecommendations(result?.data);
        }

        fetchRecommendations().catch(console.error);

    }, [])

    return (
        <>
            <Dialog size="xxl" open={openModal} handler={handleOpen}>
                <DialogHeader className="flex justify-center items-center">Its your personalized recommendations</DialogHeader>
                <DialogBody className="flex justify-center items-center">
                        {
                            recommendations.length > 0 ? ( // Змінено на ">" для правильного виводу
                                <ul className="list-disc pl-5"> {/* Додано клас для стилізації списку */}
                                    {recommendations.map((recommendation, index) => (
                                        <li key={index}>{recommendation}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recommendations available.</p> // Додано повідомлення, якщо немає рекомендацій
                            )
                        }
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(false)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default RecommendationsModal;
