<script>
    import Footer from "../../components/Footer.svelte";
    import Navbar from "../../components/Navbar.svelte";
</script>

<Navbar />
<div class="-z-10 opacity-0">
    <Navbar realnav={false} />
</div>

<main class="prose min-w-screen p-6 text-justify prose-invert md:px-[20%]">
    <h1 id="cte">Bảo mật tổ chức thi</h1>
    <h2>tldr</h2>
    <p>
        Ban Tổ chức sử dụng thuật toán băm, tức là với mỗi thần chú sẽ cho ra một đoạn "thịt băm"
        khác nhau; mà không thể nào truy ngược lại ra thần chú gốc. Như cùng một miếng thịt khi băm
        ra sẽ ra thịt băm giống nhau, nhưng không thể biến thịt băm lại thành tảng thịt gốc được.
    </p>
    <p>
        Chúng tôi chỉ cần so sánh đoạn băm của thần chú bạn và đoạn băm chính xác trong cơ sở dữ
        liệu của chúng tôi. Vì vậy, Ban Tổ chức không thể biết được đoạn thần chú của bạn hay nhắc
        cho bạn nhớ khi bạn quên, chỉ có thể reset đoạn thần chú.
    </p>
    <h2>Chi tiết kỹ thuật</h2>
    <p>
        Chúng tôi sử dụng thuật toán băm BLAKE2B với digest size 256-bit để tạo ra thần chú. Thần
        chú bắt đầu bằng <code>BỐNG BỐNG BANG BANG</code>, sau đó là một chuỗi sáu từ biểu thị cho
        mã. QR cũng được tạo bằng mã này; đính kèm thần chú vào URL parameter.
    </p>
</main>

<footer>
    <Footer />
</footer>
