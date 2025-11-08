<script>
    import { ArrowRightIcon } from "@lucide/svelte";
</script>

<div class="flex w-full flex-col md:flex-row">
    <div
        class="flex w-full flex-col gap-6 p-12 text-justify font-display text-xl font-normal text-[#A08DC0] md:w-[50%] md:gap-12 md:text-6xl"
    >
        <span
            ><i>Bụt của Cô Tấm</i> là một thử thách khoa học dữ liệu hàng năm. Dù bạn là học sinh THPT
            hay đã là sinh viên; đã có kinh nghiệm với DS hay là lính mới; bạn đều có thể thử sức với
            những thử thách này.</span
        >

        <span class="text-justify text-lg italic md:text-3xl">
            Nếu bạn hứng thú với những thử thách kiểu này, có thể bạn cũng sẽ muốn thử sức với DSTC,
            cuộc thi Data Science do CLB CTE tổ chức. <a href="/cte-va-dstc" class="underline"
                >Tìm hiểu thêm</a
            >.
        </span>
    </div>
    <div
        class="bettertext prose-lg w-full border-t border-t-accent p-12 text-justify font-normal prose-invert md:w-[50%] md:border-t-0 md:border-l md:border-l-accent prose-headings:text-fg prose-p:font-medium prose-p:text-fg2 prose-li:font-medium prose-li:text-fg2"
    >
        <h1 class="text-5xl" id="thele">Tham gia</h1>
        <p>
            Bạn không cần đăng ký tài khoản hay biết một ngôn ngữ lập trình để thử sức với những thử
            thách này.
        </p>
        <p>Các bước tham gia:</p>

        <ol class="list-disc">
            <li>
                Bạn bấm vào nút Đề bài ở dưới mục này, và đọc đề bài. Chúng mình sẽ để lại cho bạn
                một ví dụ nho nhỏ để bạn hiểu đề bài hơn.
            </li>
            <li>
                Bạn tải đề bài xuống theo định dạng mà bạn cần. Chúng mình sẽ cung cấp đề bài theo
                dạng .json, .csv, .xlsx, và .sb3.
            </li>
            <li>
                Bạn làm theo yêu cầu đề bài và nhập đáp án vào ô. Nếu câu trả lời của bạn đúng, phần
                tiếp theo của câu hỏi sẽ được mở ra.
            </li>
        </ol>

        <p>Chúc bạn may mắn!</p>
        <div>
            <a href="/debai" class="btn">Bắt đầu <ArrowRightIcon /></a>
        </div>
    </div>
</div>
