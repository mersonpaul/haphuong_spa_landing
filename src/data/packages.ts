/**
 * Source of truth for the 6 treatment packages (goi lieu trinh).
 * Content is transcribed verbatim from the spa's printed menu
 * (references/menu/*.jpg) - do not invent steps, prices or gifts.
 */

export interface PackageTherapy {
  /** e.g. "Liệu trình 1: Chăm sóc da mặt chuyên sâu..." */
  title: string;
  steps: string[];
}

export interface CarePackage {
  id: string;
  name: string;
  group: 'me-bau' | 'sau-sinh';
  /** Minutes per care session */
  sessionMinutes: number;
  therapyCount: number;
  stepCount: number;
  /** Number of sessions in the combo/package */
  sessionCount: number;
  /** Single-session price (mẹ bầu packages only) */
  singlePriceVnd?: number;
  packagePriceVnd: number;
  /** e.g. "chỉ ~285.000đ / buổi" */
  perSessionLabel: string;
  /** One-line summary shown on cards */
  description: string;
  gift?: string;
  commitment?: string;
  /** "Hiệu quả liệu trình" bullet list from the menu */
  effects: string[];
  therapies: PackageTherapy[];
  featured?: boolean;
}

const THERAPY_BODY_BAU = 'Chăm sóc body chuyên sâu trị đau nhức mỏi bằng massage bầu Nhật Bản & thảo dược thiên nhiên';
const THERAPY_FACE_HUE = 'Chăm sóc da mặt chuyên sâu bằng các thảo dược thiên nhiên theo bí quyết cung đình Huế';
const THERAPY_SLIM_JP =
  'Giảm béo sau sinh Nhật Bản kết hợp với các thảo dược thiên nhiên tuyệt đối an toàn cho nguồn sữa mẹ';

export const carePackages: CarePackage[] = [
  {
    id: 'me-bau-khoe-manh',
    name: 'Mẹ Bầu Khỏe Mạnh',
    group: 'me-bau',
    sessionMinutes: 60,
    therapyCount: 1,
    stepCount: 7,
    sessionCount: 10,
    singlePriceVnd: 355000,
    packagePriceVnd: 2850000,
    perSessionLabel: 'chỉ ~285.000đ / buổi',
    description:
      'Massage bầu Nhật Bản & thảo dược thiên nhiên - trị đau nhức mỏi toàn thân, ngâm chân giảm phù nề, tạo giấc ngủ sâu.',
    gift: '5 buổi gội đầu tại spa (hoặc 3 buổi chăm sóc da mặt tại nhà)',
    effects: [],
    therapies: [
      {
        title:
          'Chăm sóc body chuyên sâu, trị đau nhức mỏi bằng phương pháp massage bầu Nhật Bản & thảo dược thiên nhiên',
        steps: [
          'Thăm khám tổng quát đánh giá tình trạng đau nhức mỏi toàn cơ thể',
          'Ngâm chân giúp lưu thông tuần hoàn máu và giảm phù nề, tạo giấc ngủ sâu',
          'Trị liệu đau mỏi cổ vai gáy (lần 1)',
          'Nằm muối thảo dược trị liệu những vùng đau nhức mỏi',
          'Trị liệu giảm đau nhức mỏi tổ hợp lưng, hông, cổ vai gáy (lần 2) giúp giảm đau, thư giãn, giảm stress',
          'Trị liệu chân giúp giảm căng cơ, chuột rút, phù nề (chân trước/chân sau)',
          'Trị liệu tay giảm tê bì đau nhức',
        ],
      },
    ],
  },
  {
    id: 'me-bau-quyen-ru',
    name: 'Mẹ Bầu Quyến Rũ',
    group: 'me-bau',
    sessionMinutes: 90,
    therapyCount: 2,
    stepCount: 16,
    sessionCount: 10,
    singlePriceVnd: 565000,
    packagePriceVnd: 4650000,
    perSessionLabel: 'chỉ ~465.000đ / buổi',
    description:
      'Chăm sóc da mặt chuyên sâu theo bí quyết cung đình Huế + massage body bầu Nhật Bản trị đau nhức mỏi.',
    gift: '2 buổi massage bầu + 5 buổi gội đầu tại spa',
    effects: [],
    therapies: [
      {
        title: `Liệu trình 1: ${THERAPY_FACE_HUE}`,
        steps: [
          'Tẩy trang, làm sạch mặt bằng sữa rửa mặt chuyên biệt',
          'Loại bỏ tế bào chết trên da mặt giúp thông thoáng lỗ chân lông, lấy lại làn da mịn màng tươi sáng',
          'Làm sạch mặt bằng khăn ấm (tại spa)',
          'Đắp mặt nạ thảo dược cung cấp độ ẩm, dưỡng chất cho da sáng khỏe',
          'Thoa kem dưỡng để da mặt mềm mại trắng sáng đồng thời giúp ngăn ngừa nám',
        ],
      },
      {
        title: `Liệu trình 2: ${THERAPY_BODY_BAU}`,
        steps: [
          'Thăm khám tổng quát đánh giá tình trạng da mặt, da body, mức độ đau nhức mỏi toàn cơ thể',
          'Ngâm chân giúp lưu thông tuần hoàn máu và giảm phù nề, tạo giấc ngủ sâu',
          'Trị liệu đau mỏi cổ vai gáy (lần 1)',
          'Nằm muối thảo dược trị liệu những vùng đau nhức mỏi',
          'Trị thâm các vùng da tối màu với nguyên liệu đặc trị',
          'Trị liệu giảm đau nhức mỏi tổ hợp lưng, hông, cổ vai gáy giúp giảm đau, thư giãn, giảm stress (lần 2)',
          'Trị liệu chân giúp giảm căng cơ, chuột rút, phù nề (chân trước/chân sau)',
          'Trị liệu tay giảm tê bì đau nhức',
          'Trị liệu vùng đầu kích thích lưu thông máu vùng đầu và cổ, tạo giấc ngủ sâu',
          'Hỗ trợ phòng và điều trị rạn da',
          'Hỗ trợ trị liệu đá nóng body',
        ],
      },
    ],
  },
  {
    id: 'me-bau-hanh-phuc',
    name: 'Mẹ Bầu Hạnh Phúc',
    group: 'me-bau',
    sessionMinutes: 120,
    therapyCount: 2,
    stepCount: 22,
    sessionCount: 10,
    singlePriceVnd: 765000,
    packagePriceVnd: 6665000,
    perSessionLabel: 'chỉ ~666.500đ / buổi',
    description:
      'Liệu trình toàn diện nhất cho mẹ bầu: da mặt cung đình Huế (điện di, lăn đá ngũ hành) + body Nhật Bản, hỗ trợ phòng và điều trị rạn da.',
    gift: '2 buổi massage bầu + 10 buổi gội đầu tại spa',
    effects: [],
    therapies: [
      {
        title: `Liệu trình 1: ${THERAPY_FACE_HUE}`,
        steps: [
          'Tẩy trang, làm sạch mặt bằng sữa rửa mặt chuyên biệt',
          'Loại bỏ tế bào chết trên da mặt giúp thông thoáng lỗ chân lông, lấy lại làn da mịn màng tươi sáng',
          'Massage, trị liệu mặt giúp tăng lưu thông tuần hoàn máu dưới da để da mặt căng khỏe, giảm nếp nhăn và ngăn ngừa lão hoá, nám sạm',
          'Trị liệu mắt chuyên sâu giúp giảm quầng thâm, chống nhăn chảy xệ mắt',
          'Lăn đá ngũ hành giúp se khít lỗ chân lông, thư giãn vùng da mắt',
          'Làm sạch mặt bằng khăn ấm (tại spa)',
          'Đắp mặt nạ thảo dược cung cấp độ ẩm, dưỡng chất cho da sáng khỏe',
          'Xịt toner hoa hồng hữu cơ để cân bằng độ ẩm và se khít lỗ chân lông',
          'Điện di tinh chất cung cấp dưỡng chất giúp da căng hồng',
          'Thoa kem dưỡng để da mặt mềm mại trắng sáng đồng thời giúp ngăn ngừa nám',
        ],
      },
      {
        title: `Liệu trình 2: ${THERAPY_BODY_BAU}`,
        steps: [
          'Thăm khám tổng quát đánh giá tình trạng da mặt, da body, mức độ đau nhức mỏi toàn cơ thể',
          'Ngâm chân giúp lưu thông tuần hoàn máu và giảm phù nề, tạo giấc ngủ sâu',
          'Trị liệu đau mỏi cổ vai gáy (lần 1)',
          'Nằm muối thảo dược trị liệu những vùng đau nhức mỏi',
          'Trị thâm các vùng da tối màu với nguyên liệu đặc trị',
          'Trị liệu giảm đau nhức mỏi tổ hợp lưng, hông, cổ vai gáy giúp giảm đau, thư giãn, giảm stress (lần 2)',
          'Trị liệu chân giúp giảm căng cơ, chuột rút, phù nề (chân trước/chân sau)',
          'Trị liệu tay giảm tê bì đau nhức',
          'Trị liệu vùng đầu kích thích lưu thông máu vùng đầu và cổ, tạo giấc ngủ sâu',
          'Hỗ trợ tẩy da chết body và bôi kem dưỡng body',
          'Hỗ trợ phòng và điều trị rạn da',
          'Hỗ trợ trị liệu đá nóng body',
        ],
      },
    ],
  },
  {
    id: 'da-thong-kinh-lac',
    name: 'Đả Thông Kinh Lạc Sau Sinh',
    group: 'sau-sinh',
    sessionMinutes: 70,
    therapyCount: 1,
    stepCount: 9,
    sessionCount: 10,
    packagePriceVnd: 3600000,
    perSessionLabel: '360.000đ / buổi',
    description:
      'Ôn Cứu bụng tống đẩy sản dịch, nằm muối thảo dược, trị liệu đau nhức toàn thân - phục hồi sức khỏe, lưu thông khí huyết.',
    effects: ['Phục hồi sức khoẻ sau sinh', 'Lưu thông khí huyết, nhanh hết sản dịch'],
    therapies: [
      {
        title: 'Liệu trình chăm sóc gói "Đả Thông Kinh Lạc Sau Sinh"',
        steps: [
          'Thăm khám tổng quát đánh giá tình trạng ngực sữa, tử cung, sản dịch, da mặt, da body, mỡ bụng, mức độ đau nhức mỏi toàn cơ thể',
          'Nằm muối thảo dược trị liệu những vùng đau nhức mỏi và hóa lỏng mô mỡ bụng',
          'Rửa mặt, tẩy da chết, massage mặt thư giãn',
          'Hỗ trợ kiểm tra và xử lý bầu ngực, thông sữa cho mẹ',
          'Kiểm tra và sử dụng liệu pháp Ôn Cứu bụng để tống đẩy sản dịch, giảm đau co hồi tử cung (áp dụng trong 20 ngày đầu sau sinh)',
          'Trị liệu giảm đau nhức mỏi tổ hợp lưng, hông, cổ vai gáy giúp giảm đau, thư giãn, giảm stress',
          'Trị liệu chân giúp giảm căng cơ, chuột rút, phù nề (chân trước/chân sau)',
          'Trị liệu tay giảm tê bì đau nhức',
          'Trị liệu vùng đầu kích thích lưu thông máu vùng đầu và cổ, tạo giấc ngủ sâu',
        ],
      },
    ],
  },
  {
    id: 'da-trang-dang-thon',
    name: 'Da Trắng Dáng Thon',
    group: 'sau-sinh',
    sessionMinutes: 100,
    therapyCount: 2,
    stepCount: 23,
    sessionCount: 12,
    packagePriceVnd: 5900000,
    perSessionLabel: '~492.000đ / buổi',
    description:
      'Phục hồi sau sinh bằng kiêng cữ hiện đại + giảm béo kiểu Nhật, chăm sóc da toàn thân trị thâm rạn.',
    gift: '10 buổi tắm bé (hoặc giảm 12%)',
    commitment: 'Cam kết giảm từ 5 - 22cm sau khi kết thúc liệu trình',
    effects: [
      'Phục hồi làn da thâm sạm, tái tạo da giúp da trắng bật 1 - 2 tone, ngăn ngừa và giảm tình trạng mụn',
      'Phục hồi sức khoẻ sau sinh; giảm tình trạng đau đầu, nhức mỏi lưng, hông, cổ, vai, gáy giúp mẹ có giấc ngủ sâu và ngon',
      'Làm sạch sản dịch, co hồi tử cung nhanh chóng, sáng hồng se khít vùng kín',
      'Giảm lượng mỡ thừa lấy lại vóc dáng, giảm 5 - 22cm mỡ bụng chỉ sau 1 liệu trình',
    ],
    therapies: [
      {
        title:
          'Liệu trình 1: Phục hồi sức khỏe sau sinh bằng phương pháp kiêng cữ hiện đại giữ ấm cơ thể và massage trị liệu kết hợp với chăm sóc da toàn thân trị thâm rạn',
        steps: [
          'Thăm khám tổng quát đánh giá tình trạng ngực sữa, tử cung, sản dịch, da mặt, da body, mỡ bụng, mức độ đau nhức mỏi toàn cơ thể',
          'Hỗ trợ xông hơi toàn thân và vùng kín với thảo dược giúp đào thải độc tố ra ngoài cơ thể phục hồi sức khỏe sau sinh nhanh hơn (4 buổi)',
          'Nằm muối thảo dược trị liệu những vùng đau nhức mỏi và hóa lỏng mô mỡ bụng',
          'Tẩy trang, làm sạch mặt bằng sữa rửa mặt chuyên biệt',
          'Loại bỏ tế bào chết trên da mặt giúp thông thoáng lỗ chân lông, lấy lại làn da mịn màng tươi sáng',
          'Đắp mặt nạ thảo dược cung cấp độ ẩm, dưỡng chất cho da sáng khỏe',
          'Xịt toner hoa hồng hữu cơ để cân bằng độ ẩm và se khít lỗ chân lông',
          'Thoa kem dưỡng để da mặt mềm mại trắng sáng đồng thời giúp ngăn ngừa nám',
          'Hỗ trợ kiểm tra và xử lý bầu ngực, thông sữa cho mẹ',
          'Hỗ trợ kiểm tra và sử dụng liệu pháp Ôn Cứu bụng để tống đẩy sản dịch, giảm đau co hồi tử cung (áp dụng trong 20 ngày đầu sau sinh)',
          'Trị liệu giảm đau nhức mỏi tổ hợp lưng, hông, cổ vai gáy giúp giảm đau, thư giãn, giảm stress',
          'Trị liệu chân giúp giảm căng cơ, chuột rút, phù nề (chân trước/chân sau)',
          'Trị liệu tay giảm tê bì đau nhức',
          'Trị liệu vùng đầu kích thích lưu thông máu vùng đầu và cổ, tạo giấc ngủ sâu',
          'Hỗ trợ trị liệu đá nóng body',
          'Hỗ trợ thoa cốt gừng hạ thổ giữ ấm cơ thể tránh hậu sản, giảm đau nhức mỏi, khử mùi bà đẻ (với buổi có xông hơi)',
          'Thoa cốt nghệ hạ thổ giúp da body sáng hồng tự nhiên',
        ],
      },
      {
        title: `Liệu trình 2: ${THERAPY_SLIM_JP}`,
        steps: [
          'Trị liệu hoá lỏng, phá vỡ liên kết mỡ bụng bằng thảo dược giảm eo chuyên biệt',
          'Bấm huyệt dưỡng sinh, vuốt tạo form bụng theo phương pháp giảm eo kiểu Nhật',
          'Hỗ trợ máy đầm cho hoá lỏng mỡ bụng',
          'Hỗ trợ bùn cứu cho hoá lỏng mỡ bụng',
          'Quấn đai quấn nóng tạo nhiệt giúp đào thải mỡ thừa',
          'Điều hoà bụng kết thúc liệu trình giảm eo',
        ],
      },
    ],
  },
  {
    id: 'sau-sinh-hanh-phuc-vip',
    name: 'Sau Sinh Hạnh Phúc VIP',
    group: 'sau-sinh',
    sessionMinutes: 120,
    therapyCount: 3,
    stepCount: 35,
    sessionCount: 12,
    packagePriceVnd: 7350000,
    perSessionLabel: '~612.500đ / buổi',
    description:
      'Trọn bộ chăm sóc: phục hồi sau sinh, giảm béo Nhật Bản và trị mụn nám da mặt theo bí quyết cung đình Huế.',
    gift: '10 buổi tắm bé + 1 buổi float + 5 buổi gội đầu tại nhà',
    commitment: 'Cam kết giảm từ 8 - 26cm sau khi kết thúc liệu trình',
    featured: true,
    effects: [
      'Phục hồi sức khoẻ tránh hậu sản sau sinh',
      'Xóa tan nhức mỏi toàn thân, giúp mẹ có những giấc ngủ sâu',
      'Chăm sóc bầu ngực, massage chống nhão xệ, ủ men kích thích sữa về',
      'Giảm mụn, nám, da mặt sáng hồng tự nhiên',
      'Da toàn thân giảm thâm, sạm, trắng sáng bật 1 - 2 tone',
      'Giảm mỡ toàn thân, giúp cơ thể thon gọn săn chắc',
    ],
    therapies: [
      {
        title:
          'Liệu trình 1: Phục hồi sức khỏe sau sinh bằng phương pháp kiêng cữ hiện đại và massage trị liệu kết hợp với chăm sóc da toàn thân trị thâm rạn',
        steps: [
          'Thăm khám tổng quát đánh giá tình trạng ngực sữa, tử cung, sản dịch, da mặt, da body, mỡ bụng, mức độ đau nhức mỏi toàn cơ thể',
          'Xông hơi toàn thân và vùng kín với thảo dược giúp đào thải độc tố ra ngoài cơ thể phục hồi sức khỏe sau sinh nhanh hơn (5 lần)',
          'Thoa cốt gừng hạ thổ giữ ấm cơ thể tránh hậu sản, giảm đau nhức mỏi, khử mùi bà đẻ',
          'Nằm muối thảo dược trị liệu những vùng đau nhức mỏi và hóa lỏng mô mỡ bụng',
          'Trị thâm các vùng da tối màu với nguyên liệu đặc trị',
          'Hỗ trợ kiểm tra và xử lý bầu ngực, thông sữa cho mẹ',
          'Hỗ trợ kiểm tra và sử dụng liệu pháp Ôn Cứu bụng để tống đẩy sản dịch, giảm đau co hồi tử cung',
          'Trị liệu giảm đau nhức mỏi tổ hợp lưng, hông, cổ vai gáy giúp giảm đau, thư giãn, giảm stress',
          'Trị liệu chân giúp giảm căng cơ, chuột rút, phù nề (chân trước/chân sau)',
          'Trị liệu tay giảm tê bì đau nhức',
          'Trị liệu ngực và đắp men lợi sữa kích thích nguồn sữa dồi dào',
          'Trị liệu vùng đầu kích thích lưu thông máu vùng đầu và cổ, tạo giấc ngủ ngon sâu',
          'Hỗ trợ tẩy da chết body và bôi kem dưỡng body',
          'Phòng và điều trị rạn da bằng nguyên liệu chuyên biệt',
          'Hỗ trợ trị liệu đá nóng body/Ôn Cứu lưng',
          'Thoa cốt nghệ hạ thổ giúp làn da body sáng hồng tự nhiên',
        ],
      },
      {
        title: `Liệu trình 2: ${THERAPY_SLIM_JP}`,
        steps: [
          'Trị liệu hoá lỏng và phá vỡ liên kết mỡ bụng bằng thảo dược giảm eo chuyên biệt',
          'Bấm huyệt dưỡng sinh, vuốt tạo form bụng theo phương pháp giảm eo kiểu Nhật',
          'Hỗ trợ máy móc đầm rung cho hoá lỏng mỡ bụng',
          'Hỗ trợ bùn cứu cho hoá lỏng mỡ bụng',
          'Quấn đai quấn nóng tạo nhiệt giúp đào thải mỡ thừa',
          'Điều hoà bụng kết thúc liệu trình giảm eo',
        ],
      },
      {
        title:
          'Liệu trình 3: Chăm sóc da mặt chuyên sâu và điều trị mụn nám với thảo dược thiên nhiên theo bí quyết cung đình Huế',
        steps: [
          'Tẩy trang, làm sạch mặt bằng sữa rửa mặt chuyên biệt',
          'Xông hơi giúp thư giãn và đào thải bụi bẩn',
          'Loại bỏ tế bào chết trên da mặt giúp thông thoáng lỗ chân lông, lấy lại làn da mịn màng tươi sáng',
          'Loại bỏ bã nhờn, mụn cám trên mặt thông qua liệu pháp hút bã nhờn',
          'Lăn đá ngũ hành giúp se khít lỗ chân lông, thư giãn vùng da mắt',
          'Trị liệu mặt giúp tăng lưu thông tuần hoàn máu dưới da để da mặt căng khoẻ, giảm nếp nhăn và ngăn ngừa lão hoá, nám sạm',
          'Trị liệu mắt chuyên sâu giúp giảm quầng thâm, chống nhăn chảy xệ mắt',
          'Làm sạch mặt bằng khăn ấm (áp dụng chăm sóc tại spa)',
          'Thoa serum C cung cấp dưỡng chất giúp da căng hồng',
          'Chạy nâng cơ chống nhăn và ngăn ngừa lão hoá, sáng da mặt và mắt',
          'Đắp mặt nạ thảo dược vùng mặt + mắt + cổ cung cấp độ ẩm, dưỡng chất cho da sáng khỏe đều màu',
          'Xịt toner hoa hồng hữu cơ để cân bằng độ ẩm và se khít lỗ chân lông',
          'Thoa kem dưỡng để da mặt mềm mại trắng sáng đồng thời giúp ngăn ngừa nám',
        ],
      },
    ],
  },
];

export const packageGroups = [
  {
    id: 'me-bau' as const,
    title: 'Cho mẹ bầu',
    subtitle: 'Massage bầu Nhật Bản · buổi lẻ hoặc combo 10 buổi',
  },
  {
    id: 'sau-sinh' as const,
    title: 'Cho mẹ sau sinh',
    subtitle: 'Phục hồi & lấy lại vóc dáng · trọn liệu trình',
  },
];

/** Format 2850000 -> "2.850.000đ" */
export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('de-DE')}đ`;
}

/**
 * Markdown rendering of the packages for /llms.txt (summary) and
 * /llms-full.txt (full therapy steps) - GEO plain-text surfaces.
 */
export function packagesMarkdown(withSteps: boolean): string {
  return packageGroups
    .map((group) => {
      const rows = carePackages
        .filter((pkg) => pkg.group === group.id)
        .map((pkg) => {
          const single = pkg.singlePriceVnd
            ? `buổi lẻ ${formatVnd(pkg.singlePriceVnd)} - `
            : '';
          const head = `- **Gói ${pkg.name}** (${pkg.sessionMinutes} phút/buổi, ${pkg.therapyCount} liệu trình, ${pkg.stepCount} bước): ${single}${pkg.singlePriceVnd ? 'combo' : 'gói'} ${pkg.sessionCount} buổi ${formatVnd(pkg.packagePriceVnd)}`;
          const extras = [
            pkg.gift ? `  - Quà tặng: ${pkg.gift}` : '',
            pkg.commitment ? `  - ${pkg.commitment}` : '',
          ].filter(Boolean);
          const steps = withSteps
            ? pkg.therapies.flatMap((therapy) => [
                `  - ${therapy.title}:`,
                ...therapy.steps.map((step, index) => `    ${index + 1}. ${step}`),
              ])
            : [];
          const effects =
            withSteps && pkg.effects.length > 0
              ? [`  - Hiệu quả liệu trình: ${pkg.effects.join('; ')}`]
              : [];
          return [head, ...extras, ...steps, ...effects].join('\n');
        })
        .join('\n');
      return `### ${group.title} (${group.subtitle})\n${rows}`;
    })
    .join('\n\n');
}
