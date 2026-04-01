import {LabelTextInfo} from "@/shared/ui/label-text-info";
import {CalendarIcon, Clock, DollarSignIcon, Star, Users} from "lucide-react";
import {TagList} from "@/shared/ui/TagList";
import {SearchRequest} from "@/entities/search-request/model/types";
import {formatDate, hoursLeft} from "@/shared/lib/date/formateDate";

interface RequestInfoProps {
    request: SearchRequest
}

export function RequestInfo({request}:RequestInfoProps) {

    return (
        <article className="bg-white border rounded-xl shadow-md p-4 sm:p-6 md:p-10 hover:shadow-lg transition-shadow">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:flex-wrap gap-4 sm:gap-6">
                <LabelTextInfo
                    icon={<CalendarIcon width={18} height={18} className="sm:w-5 sm:h-5 text-green-500" />}
                    label="Дата заезда"
                    value={formatDate(request.checkInDate.split('T')[0])}
                />

                <LabelTextInfo
                    icon={<CalendarIcon width={18} height={18} className="sm:w-5 sm:h-5 text-green-500" />}
                    label="Дата выезда"
                    value={formatDate(request.checkOutDate.split('T')[0])}
                />

                <LabelTextInfo
                    icon={<Users width={18} height={18} className="sm:w-5 sm:h-5 text-green-500" />}
                    label="Гости"
                    value={request.countOfPeople}
                />

                <LabelTextInfo
                    icon={<DollarSignIcon width={18} height={18} className="sm:w-5 sm:h-5 text-green-500" />}
                    label="Бюджет"
                    value={`${request.price.toLocaleString("ru-RU")} Тг`}
                />

                <LabelTextInfo
                    icon={<Star width={18} height={18} className="sm:w-5 sm:h-5 text-yellow-500" />}
                    label="Рейтинг объекта"
                    value={`от ${request.fromRating} до ${request.toRating}`}
                />

                {request.expiresAt && (
                    <LabelTextInfo
                        icon={<Clock width={18} height={18} className="sm:w-5 sm:h-5 text-red-500" />}
                        label="Действует до"
                        value={hoursLeft(request.expiresAt)}
                    />
                )}
            </header>

            <hr className="my-4 sm:my-5 md:my-6" />

            <footer className="flex flex-col gap-4 sm:gap-5">
                <TagList
                    title="Типы размещения:"
                    items={request.unitTypes}
                    color="green"
                />

                <TagList
                    title="Необходимые услуги:"
                    items={request.services.map((service) => service.value)}
                    color="blue"
                />

                <TagList
                    title="Необходимые условия:"
                    items={request.conditions.map((condition) => condition.value)}
                    color="purple"
                />
            </footer>
        </article>
    )
}