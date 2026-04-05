"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { CheckCircle2 } from "lucide-react";

interface CreateAccommodationSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateAccommodationSuccessModal({
    isOpen,
    onClose,
}: CreateAccommodationSuccessModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-center mb-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <DialogTitle className="text-center text-xl sm:text-2xl">
                        Запрос отправлен
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm sm:text-base pt-2">
                        Ваш запрос на создание размещения успешно отправлен администратору на рассмотрение.
                        Вы будете уведомлены о результате проверки.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center">
                    <Button onClick={onClose} className="w-full sm:w-auto">
                        Понятно
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

