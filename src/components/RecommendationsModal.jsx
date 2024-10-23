import {
    Dialog,
    DialogBody,
    DialogHeader
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdHealthAndSafety } from "react-icons/md";
import tasksGateway from "../gateways/tasksGateway";
const RecommendationsModal = ({ handleOpen, openModal }) => {
    const [wellDoneRecommendations, setWellDoneRecommendations] = useState([]);
    const [improvementRecommendations, setImprovementRecommendations] = useState([]);
    const [badDoneRecommendations, setBadDoneRecommendations] = useState([]);
    const [mentalHealthRecommendations, setMentalHealthRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            var result = await tasksGateway.GetRecomendations();
            setWellDoneRecommendations(result?.data[0]);
            setImprovementRecommendations(result?.data[1]);
            setBadDoneRecommendations(result?.data[2]);
            setMentalHealthRecommendations(result?.data[3]);
        }

        fetchRecommendations().catch(console.error);

    }, [])

    return (
        <>
            <Dialog className="overflow-scroll" size="xxl" open={openModal} handler={handleOpen}>
                <DialogHeader className="relative flex justify-center items-center">
                    <div className="flex">
                        <div>Its your personalized recommendations</div>
                    </div>

                    <IoCloseCircleOutline onClick={() => handleOpen(false)} className="absolute top-0 right-0 m-2 cursor-pointer" size={32} />

                </DialogHeader>

                <DialogBody className="flex flex-col items-center">

                    <div className="flex w-full ">
                        {/* 1 */}
                        <div className="flex flex-col w-full mt-10 mr-5">
                            <div className="flex w-full justify-between pr-5 pl-5 pt-1 pb-1 border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]" >
                                <div className=" text-xl flex justify-center items-center">
                                    What you do well
                                </div>
                                <div>
                                    <CiFaceSmile color="#47c934" size={42} />
                                </div>
                            </div >
                            <div className="flex justify-between p-5 border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
                                {
                                    wellDoneRecommendations.length > 0 ? ( // Змінено на ">" для правильного виводу
                                        <ul className="list-disc pl-5"> {/* Додано клас для стилізації списку */}
                                            {wellDoneRecommendations.map((recommendation, index) => (
                                                <li key={index}>{recommendation}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No recommendations available.</p> // Додано повідомлення, якщо немає рекомендацій
                                    )
                                }
                            </div>
                        </div>

                        {/* 2 */}
                        <div className="flex flex-col w-full items-center mt-10">
                            <div className="flex w-full justify-between pr-5 pl-5 pt-1 pb-1 border-l-4 border-[#FFC300] bg-[#FFC300]/10 font-medium text-[]">
                                <div className=" text-xl flex justify-center items-center">
                                    What you can improve
                                </div>
                                <div>
                                    <CiFaceMeh color="#FFC300" size={42} />
                                </div>
                            </div >
                            <div className="flex justify-between p-5 border-l-4 border-[#FFC300] bg-[#FFC300]/10 font-medium text-[]">
                                {
                                    improvementRecommendations.length > 0 ? ( // Змінено на ">" для правильного виводу
                                        <ul className="list-disc pl-5"> {/* Додано клас для стилізації списку */}
                                            {improvementRecommendations.map((recommendation, index) => (
                                                <li key={index}>{recommendation}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No recommendations available.</p> // Додано повідомлення, якщо немає рекомендацій
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full">
                        {/* 3 */}
                        <div className="flex flex-col w-full items-center mt-10 mr-5">
                            <div className="flex  w-full justify-between pr-5 pl-5 pt-1 pb-1 border-l-4 border-[#C70039] bg-[#C70039]/10 font-medium text-[#C70039]" >
                                <div className=" text-xl flex justify-center items-center">
                                    What you do bad
                                </div>
                                <div>
                                    <CiFaceFrown color="#C70039" size={42} />
                                </div>
                            </div >
                            <div className="flex justify-between p-5 border-l-4 border-[#C70039] bg-[#C70039]/10 font-medium text-[#C70039]">
                                {
                                    badDoneRecommendations.length > 0 ? ( // Змінено на ">" для правильного виводу
                                        <ul className="list-disc pl-5"> {/* Додано клас для стилізації списку */}
                                            {badDoneRecommendations.map((recommendation, index) => (
                                                <li key={index}>{recommendation}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No recommendations available.</p> // Додано повідомлення, якщо немає рекомендацій
                                    )
                                }
                            </div>
                        </div>

                        {/* 4*/}
                        <div className="flex flex-col w-full items-center mt-10">
                            <div className="flex  w-full justify-between pr-5 pl-5 pt-1 pb-1 border-l-4 border-[#6c34c9] bg-[#6c34c9]/10 font-medium text-[#6c34c9]" >
                                <div className=" text-xl flex justify-center items-center">
                                    Mental health
                                </div>
                                <div>
                                    <MdHealthAndSafety color="#6c34c9" size={42} />
                                </div>
                            </div >
                            <div className="flex w-full justify-between p-5 border-l-4 border-[#6c34c9] bg-[#6c34c9]/10 font-medium text-[#6c34c9]">
                                {
                                    mentalHealthRecommendations.length > 0 ? ( // Змінено на ">" для правильного виводу
                                        <ul className="list-disc pl-5"> {/* Додано клас для стилізації списку */}
                                            {mentalHealthRecommendations.map((recommendation, index) => (
                                                <li key={index}>{recommendation}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No recommendations available.</p> // Додано повідомлення, якщо немає рекомендацій
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default RecommendationsModal;
