"use client";
import {useState, useCallback, useEffect} from "react";
import {useMe} from "@/entities/user/model/api/useMe";
import {User as UserIcon, Mail, Phone, UserCircle, Pencil, Camera, X} from "lucide-react";
import {Spinner} from "@/shared/ui/spinner";
import {formatErrorForToast} from "@/shared/lib/error/formatError";
import {toast} from "sonner";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {Button} from "@/shared/ui/button";
import {EditProfileModal} from "@/widgets/user-profile/ui/EditProfileModal";
import {EditPhotoModal} from "@/widgets/user-profile/ui/EditPhotoModal";
import {Dialog, DialogContent, DialogTitle} from "@/shared/ui/dialog";

function ProfileCard({icon: Icon, label, value}: {icon: React.ElementType; label: string; value: string}) {
    return (
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 break-words">{value}</p>
            </div>
        </div>
    );
}

function getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function UserProfile() {
    const {data, isLoading, error} = useMe();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isPhotoViewerOpen) return;
        if (e.key === "Escape") {
            setIsPhotoViewerOpen(false);
        }
    }, [isPhotoViewerOpen]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown]);

    useEffect(() => {
        if (error) {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Не удалось загрузить данные профиля",
            });
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Spinner className={"w-10 h-10"} />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="px-4 sm:px-6 py-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm sm:text-base text-red-600">
                        Не удалось загрузить данные профиля
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 my-10">
            <div className="bg-white rounded-xl  sm:rounded-2xl md:rounded-3xl shadow-lg border border-gray-300 overflow-hidden mb-4 sm:mb-6 md:mb-8">
                <div className="bg-primary px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-center relative">
                    <div className="flex justify-center mb-3 sm:mb-4 relative">
                        <button
                            type="button"
                            onClick={() => {
                                if (data?.photoUrl) {
                                    setIsPhotoViewerOpen(true);
                                }
                            }}
                            className="relative group cursor-pointer"
                            disabled={!data?.photoUrl}
                            aria-label="Открыть фото профиля"
                        >
                            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 sm:border-4 border-white shadow-lg transition-transform group-hover:scale-105 group-disabled:cursor-default">
                                <AvatarFallback className="bg-white text-green-600 text-2xl sm:text-3xl md:text-4xl font-bold">
                                    {getInitials(data.firstName, data.lastName)}
                                </AvatarFallback>
                                {data?.photoUrl && (
                                    <AvatarImage 
                                        src={data.photoUrl} 
                                        className="object-cover" 
                                        alt={`${data.firstName} ${data.lastName}`}
                                    />
                                )}
                            </Avatar>
                            {data?.photoUrl && (
                                <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                        </button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-0 right-0 sm:right-0 rounded-full bg-white hover:bg-gray-100 shadow-lg z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsPhotoModalOpen(true);
                            }}
                            aria-label="Изменить фото"
                        >
                            <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                        </Button>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 break-words px-2">
                        {data.firstName} {data.lastName}
                    </h2>
                </div>

                <div className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 md:space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-600">Личная информация</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditModalOpen(true)}
                            className="w-full sm:w-auto"
                        >
                            <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            <span className="text-sm sm:text-base">Редактировать</span>
                        </Button>
                    </div>
                    <ProfileCard
                        icon={UserCircle}
                        label="Имя пользователя"
                        value={data.username}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <ProfileCard
                            icon={UserIcon}
                            label="Имя"
                            value={data.firstName}
                        />
                        <ProfileCard
                            icon={UserIcon}
                            label="Фамилия"
                            value={data.lastName}
                        />
                    </div>
                    <ProfileCard
                        icon={Mail}
                        label="Email"
                        value={data.email}
                    />
                    <ProfileCard
                        icon={Phone}
                        label="Номер телефона"
                        value={data.phoneNumber}
                    />
                </div>
            </div>

            <EditProfileModal
                open={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                initialData={data}
            />

            <EditPhotoModal
                open={isPhotoModalOpen}
                setOpen={setIsPhotoModalOpen}
                currentInitials={getInitials(data.firstName, data.lastName)}
                currentPhotoUrl={data.photoUrl}
            />

            {/* Photo Viewer Modal */}
            {data?.photoUrl && (
                <Dialog open={isPhotoViewerOpen} onOpenChange={setIsPhotoViewerOpen}>
                    <DialogTitle className="sr-only">Просмотр фото профиля</DialogTitle>
                    <DialogContent className="w-[95vw] sm:w-[90vw] md:min-w-6xl h-[95vh] sm:h-[90vh] p-0 bg-black/95 border-none">
                        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                            {/* Кнопка закрытия */}
                            <button
                                onClick={() => setIsPhotoViewerOpen(false)}
                                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors touch-manipulation"
                                aria-label="Закрыть"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <img
                                src={data.photoUrl}
                                alt={`${data.firstName} ${data.lastName}`}
                                className="max-w-full max-h-full object-contain select-none"
                                draggable={false}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}